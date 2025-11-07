// import type React from "react"
// import type { Metadata } from "next"
// import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
// import { Providers } from "./providers"
// import "./globals.css"

// const _geist = Geist({ subsets: ["latin"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Tally Product Review | Schedule Your Free Session",
//   description:
//     "Transform your Tally setup with a free personalized product review. Identify inefficiencies, enhance compliance, and boost team productivity.",
//   generator: "v0.app",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en" dir="ltr" className="scroll-smooth">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//       </head>
//       <body className={`${_geist.className} antialiased`}>
//         <Providers>{children}</Providers>
//         <Analytics />
//       </body>
//     </html>
//   )
// }

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"
import { SessionProviders } from "@/components/sections/Provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tally Product Review | Schedule Your Free Session",
  description:
    "Transform your Tally setup with a free personalized product review. Identify inefficiencies, enhance compliance, and boost team productivity.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${_geist.className} antialiased`}
      >
        <SessionProviders>
        <Providers>{children}</Providers>
        </SessionProviders>
        <Analytics />
      </body>
    </html>
  )
}
