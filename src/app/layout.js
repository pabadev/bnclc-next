import { Poppins, Geist_Mono } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-poppins',
  display: 'swap'
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata = {
  title: 'Binacalc Next',
  description: 'Calculadora de gestión de riesgo para trading'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`${poppins.variable} ${geistMono.variable}`}>
      <body className='antialiased font-sans'>{children}</body>
    </html>
  )
}
