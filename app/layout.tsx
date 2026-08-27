import { Geist_Mono, Michroma, Albert_Sans, Space_Grotesk, Architects_Daughter } from 'next/font/google'
import './globals.css'

const albertSans = Albert_Sans({ variable: '--font-albert', subsets: ['latin', 'latin-ext'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const michroma = Michroma({ variable: '--font-michroma', subsets: ['latin'], weight: '400' })
const spaceGrotesk = Space_Grotesk({ variable: '--font-space-grotesk', subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700'] })
const architectsDaughter = Architects_Daughter({ variable: '--font-architects', subsets: ['latin'], weight: '400' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body
        className={`${albertSans.variable} ${geistMono.variable} ${michroma.variable} ${spaceGrotesk.variable} ${architectsDaughter.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  )
}
