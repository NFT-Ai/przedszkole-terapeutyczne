import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { format, parseISO } from "date-fns"
import { pl } from "date-fns/locale"
import { PortableText } from "@portabletext/react"

import { Button } from "@/components/ui/button"
import { client, urlFor } from "@/lib/sanity"

async function getEventBySlug(slug: string) {
  try {
    return await client.fetch(
      `
      *[_type == "specialEvent" && slug.current == $slug][0] {
        _id,
        title,
        eventDate,
        bannerImage,
        description,
        location,
        registrationLink
      }
    `,
      { slug },
    )
  } catch (error) {
    console.error("Błąd podczas pobierania wydarzenia:", error)
    return null
  }
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug)

  if (!event) {
    return (
      <div className="py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Wydarzenie nie znalezione</h1>
        <p className="mb-8">Przepraszamy, nie mogliśmy znaleźć wydarzenia o podanym adresie.</p>
        <Button asChild>
          <Link href="/">Wróć na stronę główną</Link>
        </Button>
      </div>
    )
  }

  const eventDate = parseISO(event.eventDate)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] overflow-hidden">
        <Image
          src={urlFor(event.bannerImage).url() || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-primary mr-2" />
              <span className="text-lg">{format(eventDate, "EEEE, d MMMM yyyy", { locale: pl })}</span>
            </div>
            {event.location && (
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-primary mr-2" />
                <span className="text-lg">{event.location}</span>
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            {event.description ? (
              <PortableText value={event.description} />
            ) : (
              <p>Brak szczegółowego opisu wydarzenia.</p>
            )}
          </div>

          {event.registrationLink && (
            <div className="mt-8 text-center">
              <Button asChild size="lg">
                <Link href={event.registrationLink}>Zapisz się na wydarzenie</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Back to events */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <Button asChild variant="outline">
            <Link href="/wydarzenia">Zobacz wszystkie wydarzenia</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

