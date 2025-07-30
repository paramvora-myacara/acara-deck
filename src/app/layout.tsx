import './globals.css'

export const metadata = {
  title: 'Acara Cap',
  description: 'Acara Cap - Real estate lending platform and investment opportunities',
  icons: {
    icon: '/ACARAfavicon.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
