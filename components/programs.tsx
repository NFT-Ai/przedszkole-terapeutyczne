import { BookOpen, Brain, HeartHandshake, Music, Puzzle, Utensils } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { client } from "@/lib/sanity"

// Mapowanie nazw ikon z Sanity na komponenty Lucide
const iconMap: Record<string, any> = {
  BookOpen,
  Brain,
  Puzzle,
  Music,
  HeartHandshake,
  Utensils,
}

async function getPrograms() {
  try {
    return await client.fetch(`
      *[_type == "program"] | order(order asc) {
        _id,
        title,
        description,
        icon
      }
    `)
  } catch (error) {
    console.error("Błąd podczas pobierania programów:", error)
    return []
  }
}

export default async function Programs() {
  const programs = (await getPrograms()) || []

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nasze programy</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferujemy kompleksowe programy terapeutyczne i edukacyjne dostosowane do indywidualnych potrzeb każdego
            dziecka
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => {
            const IconComponent = iconMap[program.icon] || BookOpen

            return (
              <Card key={program._id} className="border-none shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                  <p className="text-muted-foreground">{program.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="px-0">
                    <Link href="/programy">Dowiedz się więcej</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

