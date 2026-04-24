import { Geist, Geist_Mono, Michroma } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const michroma = Michroma({ variable: '--font-michroma', subsets: ['latin'], weight: '400' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  )
}
