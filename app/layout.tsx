import type { Metadata } from 'next'
import { DM_Sans, IBM_Plex_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'

const fontSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const fontMono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500', '600'] })
const fontDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-display', weight: ['600', '700'] })

export const metadata: Metadata = {
  title: 'Financeiro Soluv.IA',
  description: 'Gestão financeira executiva com governança, reservas e fechamento mensal.'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable}`}>
        {children}
      </body>
    </html>
  )
}
