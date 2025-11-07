// import NextAuth from "next-auth"
// import AzureADProvider from "next-auth/providers/azure-ad"

// // Note: adjust import name according to your next-auth version/provider package

// export default NextAuth({
//   providers: [
//     AzureADProvider({
//       clientId: process.env.AZURE_AD_CLIENT_ID!,
//       clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
//       tenantId: process.env.AZURE_AD_TENANT_ID!,
//       authorization: {
//         params: {
//           scope: "openid profile email offline_access Calendars.ReadWrite"
//         }
//       }
//     })
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     async jwt({ token, account }) {
//       // প্রথম লগইন/রিফ্রেশ হলে account.access_token পাওয়া যাবে
//       if (account?.access_token) {
//         token.accessToken = account.access_token
//         token.accessTokenExpires = Date.now() + (account.expires_at ?? 3600) * 1000
//         token.refreshToken = account.refresh_token
//       }
//       // (Optional) token refresh logic প্রত্যক্ষ করতে চাইলে এখানে যোগ করো
//       return token
//     },
//     async session({ session, token }) {
//       // session এ accessToken রাখি যাতে server-side API রুটে ব্যবহার করা যায়
//       (session as any).accessToken = token.accessToken
//       return session
//     }
//   }
// })


// app/api/auth/[...nextauth]/route.ts
// app/api/auth/[...nextauth]/route.ts
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }