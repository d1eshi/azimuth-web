import './global.css'
import type { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Azimuth',
  description: 'Web app Azimuth',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className='h-screen'>{children}</body>
    </html>
  )
}
