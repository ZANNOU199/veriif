import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="RechargeSecure" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/placeholder-logo.png" sizes="192x192" />
      </head>
  <body className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={<div className="flex-1 flex items-center justify-center">Chargement...</div>}>
              <main className="flex-1 overflow-hidden">
                {children}
              </main>
            </Suspense>
            {/** Footer légal et branding */}
            {require('../components/LegalFooter').default()}
          </div>
        </LanguageProvider>
        <Analytics />
        <script dangerouslySetInnerHTML={{__html:`
          document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x')) || e.key === 'PrintScreen') {
              e.preventDefault();
            }
          });
        `}} />
      </body>
    </html>
  )
}
