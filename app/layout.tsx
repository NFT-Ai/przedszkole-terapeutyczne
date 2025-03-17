import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "latin-ext"] })

export const metadata = {
  title: 'Przedszkole Terapeutyczne "Radosny Świat"',
  description: "Specjalistyczna opieka i edukacja dla dzieci ze szczególnymi potrzebami",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex flex-col min-h-screen">
            <header className="border-b">
              <div className="container flex h-16 items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <Link href="/" className="font-bold text-xl text-primary">
                    Radosny Świat
                  </Link>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                  <Link href="/" className="text-sm font-medium hover:text-primary">
                    Strona główna
                  </Link>
                  <Link href="/o-nas" className="text-sm font-medium hover:text-primary">
                    O nas
                  </Link>
                  <Link href="/programy" className="text-sm font-medium hover:text-primary">
                    Programy
                  </Link>
                  <Link href="/galeria" className="text-sm font-medium hover:text-primary">
                    Galeria
                  </Link>
                  <Link href="/aktualnosci" className="text-sm font-medium hover:text-primary">
                    Aktualności
                  </Link>
                  <Link href="/kontakt" className="text-sm font-medium hover:text-primary">
                    Kontakt
                  </Link>
                </nav>
                <div className="flex items-center gap-4">
                  <Button asChild>
                    <Link href="/kontakt">Umów wizytę</Link>
                  </Button>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="bg-muted py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Przedszkole Terapeutyczne "Radosny Świat"</h3>
                    <p className="text-muted-foreground mb-4">
                      Specjalistyczna opieka i edukacja dla dzieci ze szczególnymi potrzebami
                    </p>
                    <div className="flex space-x-4">
                      <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                        <Facebook className="h-5 w-5" />
                        <span className="sr-only">Facebook</span>
                      </Link>
                      <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                      </Link>
                      <Link href="mailto:kontakt@radosnyswiat.pl" className="text-muted-foreground hover:text-primary">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Nawigacja</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/" className="text-muted-foreground hover:text-primary">
                          Strona główna
                        </Link>
                      </li>
                      <li>
                        <Link href="/o-nas" className="text-muted-foreground hover:text-primary">
                          O nas
                        </Link>
                      </li>
                      <li>
                        <Link href="/programy" className="text-muted-foreground hover:text-primary">
                          Programy
                        </Link>
                      </li>
                      <li>
                        <Link href="/galeria" className="text-muted-foreground hover:text-primary">
                          Galeria
                        </Link>
                      </li>
                      <li>
                        <Link href="/aktualnosci" className="text-muted-foreground hover:text-primary">
                          Aktualności
                        </Link>
                      </li>
                      <li>
                        <Link href="/kontakt" className="text-muted-foreground hover:text-primary">
                          Kontakt
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span className="text-muted-foreground">
                          ul. Terapeutyczna 5<br />
                          00-000 Warszawa
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Phone className="h-5 w-5 text-primary mr-2" />
                        <span className="text-muted-foreground">+48 123 456 789</span>
                      </li>
                      <li className="flex items-center">
                        <Mail className="h-5 w-5 text-primary mr-2" />
                        <span className="text-muted-foreground">kontakt@radosnyswiat.pl</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Godziny otwarcia</h3>
                    <ul className="space-y-2">
                      <li className="text-muted-foreground">
                        <span className="font-medium">Poniedziałek - Piątek:</span> 7:00 - 17:00
                      </li>
                      <li className="text-muted-foreground">
                        <span className="font-medium">Sobota - Niedziela:</span> Zamknięte
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
                  <p>
                    &copy; {new Date().getFullYear()} Przedszkole Terapeutyczne "Radosny Świat". Wszelkie prawa
                    zastrzeżone.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'