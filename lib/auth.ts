// lib/auth.ts
import NextAuth, { NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"
import AzureADProvider from "next-auth/providers/azure-ad"

interface Token extends JWT {
  accessToken?: string
  accessTokenExpires?: number
  refreshToken?: string
  error?: string
}

// Refresh Azure AD access token
async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`

    const params = new URLSearchParams({
      client_id: process.env.AZURE_AD_CLIENT_ID!,
      client_secret: process.env.AZURE_AD_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken as string,
    })

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })

    const refreshed = await response.json()
    if (!response.ok) throw refreshed

    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error("Error refreshing access token", error)
    return { ...token, error: "RefreshAccessTokenError" }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: { scope: "openid profile email offline_access Calendars.ReadWrite" },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + (account.expires_at ?? 3600) * 1000,
          refreshToken: account.refresh_token,
          user: token.user,
        }
      }

      if (Date.now() < (token.accessTokenExpires as number)) return token

      return refreshAccessToken(token as Token)
    },

    async session({ session, token }) {
      ;(session as any).accessToken = (token as Token).accessToken
      ;(session as any).error = (token as Token).error
      return session
    },
  },
}

export default NextAuth(authOptions)