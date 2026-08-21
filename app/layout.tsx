import { Geist_Mono, Michroma, Albert_Sans } from 'next/font/google'
import './globals.css'

const albertSans = Albert_Sans({ variable: '--font-albert', subsets: ['latin', 'latin-ext'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const michroma = Michroma({ variable: '--font-michroma', subsets: ['latin'], weight: '400' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body
        className={`${albertSans.variable} ${geistMono.variable} ${michroma.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  )
}
