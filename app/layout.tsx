import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CI.NETTOYAGE - Services professionnels de nettoyage dans tout le Var",
  description:
    "CI.NETTOYAGE vous offre des services de nettoyage de haute qualité pour particuliers et professionnels dans tout le Var. Ménage, débarras, nettoyage de copropriété et locaux professionnels.",
  keywords: "nettoyage, ménage, débarras, copropriété, vitre, fin de chantier, Toulon, La Seyne-sur-Mer, Var, PACA",
  openGraph: {
    title: "CI.NETTOYAGE - Services professionnels de nettoyage dans tout le Var",
    description: "Services de nettoyage professionnel pour particuliers et entreprises dans tout le Var",
    url: "https://ci-nettoyage.fr",
    siteName: "CI.NETTOYAGE",
    locale: "fr_FR",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
