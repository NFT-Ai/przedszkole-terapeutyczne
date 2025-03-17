"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { urlFor } from "@/lib/sanity"
import { Button } from "@/components/ui/button"

interface Event {
  _id: string
  title: string
  slug: {
    current: string
  }
  eventDate: string
  bannerImage: any
  description: any
  registrationLink?: string
}

export default function EventSlider({ events }: { events: Event[] }) {
  const [current, setCurrent] = useState(0)
  const length = events.length

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === length - 1 ? 0 : current + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [current, length])

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  if (!events || events.length === 0) {
    return null
  }

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {events.map((event, index) => (
        <div
          key={event._id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: index === current ? 1 : 0 }}
        >
          <Image
            src={urlFor(event.bannerImage).url() || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{event.title}</h2>
              <p className="text-xl text-white mb-2">
                {new Date(event.eventDate).toLocaleDateString("pl-PL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-lg text-white mb-8">
                {(Array.isArray(event.description) && event.description[0]?.children?.[0]?.text) ||
                  "Szczegóły wydarzenia dostępne po kliknięciu"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link href={`/wydarzenia/${event.slug.current}`}>Szczegóły</Link>
                </Button>
                {event.registrationLink && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-lg bg-white/20 text-white hover:bg-white/30"
                  >
                    <Link href={event.registrationLink}>Zapisz się</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Nawigacja slidera */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8 text-white" />
        <span className="sr-only">Poprzednie wydarzenie</span>
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 rounded-full p-2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8 text-white" />
        <span className="sr-only">Następne wydarzenie</span>
      </button>

      {/* Wskaźniki */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {events.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === current ? "bg-white" : "bg-white/50"}`}
            onClick={() => setCurrent(index)}
          >
            <span className="sr-only">Wydarzenie {index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

