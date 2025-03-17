import type React from "react"
export const metadata = {
  title: "Sanity Studio",
  description: "Panel administracyjny dla Przedszkola Terapeutycznego",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}

