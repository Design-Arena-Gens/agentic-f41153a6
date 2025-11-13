export const metadata = {
  title: 'English Literature Benefits',
  description: 'How English Literature is Beneficial in Practical Life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
