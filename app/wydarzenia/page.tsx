import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { format, parseISO } from "date-fns"
import { pl } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { client, urlFor } from "@/lib/sanity"

async function getEvents() {
  try {
    return await client.fetch(`
      *[_type == "specialEvent"] | order(eventDate asc) {
        _id,
        title,
        slug,
        eventDate,
        bannerImage,
        description,
        location
      }
    `)
  } catch (error) {
    console.error("Błąd podczas pobierania wydarzeń:", error)
    return []
  }
}

export default async function EventsPage() {
  const events = (await getEvents()) || []

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-16 px-4 sm:px-6 lg:px-8 text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Wydarzenia</h1>
          <p className="text-xl">Sprawdź nadchodzące wydarzenia w naszym przedszkolu</p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => {
                const eventDate = parseISO(event.eventDate)

                return (
                  <Card key={event._id} className="flex flex-col h-full border-none shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={urlFor(event.bannerImage).url() || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex-grow p-6">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm text-muted-foreground">
                          {format(eventDate, "d MMMM yyyy", { locale: pl })}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center mb-4">
                          <MapPin className="h-4 w-4 text-primary mr-2" />
                          <span className="text-sm text-muted-foreground">{event.location}</span>
                        </div>
                      )}
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground line-clamp-3">
                        {Array.isArray(event.description) && event.description[0]?.children?.[0]?.text}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button asChild>
                        <Link href={`/wydarzenia/${event.slug.current}`}>Szczegóły</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <p className="text-lg">Brak zaplanowanych wydarzeń</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

