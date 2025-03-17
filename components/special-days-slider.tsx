"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { format, parseISO } from "date-fns"
import { pl } from "date-fns/locale"
import { Button } from "@/components/ui/button"

interface SpecialDayEvent {
  id: string
  summary: string
  description?: string
  start: {
    date: string
  }
  end: {
    date: string
  }
  location?: string
}

export default function SpecialDaysSlider() {
  const [events, setEvents] = useState<SpecialDayEvent[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_KEY = "AIzaSyC4Cliuc_Zru4OXCkA3uhKIRWrlozwih5I"
  const CALENDAR_ID = "40f318b3012cbfe5df4b48cebc912d5de43070e3d33c01050188110a53a3adda@group.calendar.google.com"

  useEffect(() => {
    const fetchSpecialDays = async () => {
      setLoading(true)
      setError(null)
      try {
        // Pobieramy wydarzenia z najbliższych 3 miesięcy
        const today = new Date()
        const threeMonthsLater = new Date()
        threeMonthsLater.setMonth(today.getMonth() + 3)

        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          CALENDAR_ID,
        )}/events?key=${API_KEY}&timeMin=${today.toISOString()}&timeMax=${threeMonthsLater.toISOString()}&singleEvents=true&orderBy=startTime`

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Błąd pobierania danych: ${response.status}`)
        }

        const data = await response.json()

        if (data.items) {
          // Filtrujemy tylko wydarzenia całodniowe (mają pole date zamiast dateTime)
          const specialDays = data.items.filter(
            (event: any) => event.start && event.start.date && !event.start.dateTime,
          )

          // Sortujemy po dacie (najbliższe najpierw)
          specialDays.sort((a: any, b: any) => {
            const dateA = new Date(a.start.date)
            const dateB = new Date(b.start.date)
            return dateA.getTime() - dateB.getTime()
          })

          setEvents(specialDays)
        }
      } catch (error) {
        console.error("Błąd podczas pobierania dni specjalnych:", error)
        setError("Nie udało się pobrać dni specjalnych.")
      } finally {
        setLoading(false)
      }
    }

    fetchSpecialDays()
  }, [])

  useEffect(() => {
    if (events.length > 0) {
      const interval = setInterval(() => {
        setCurrent((current) => (current === events.length - 1 ? 0 : current + 1))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [events.length])

  const nextSlide = () => {
    setCurrent(current === events.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? events.length - 1 : current - 1)
  }

  if (loading) {
    return (
      <section className="relative w-full h-[500px] md:h-[600px] bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4">Ładowanie wydarzeń specjalnych...</p>
        </div>
      </section>
    )
  }

  if (error || events.length === 0) {
    return (
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Dzieci bawiące się w przedszkolu"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Przedszkole Terapeutyczne "Radosny Świat"
            </h1>
            <p className="text-xl text-white mb-8">
              Specjalistyczna opieka i edukacja dla dzieci ze szczególnymi potrzebami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/kontakt">Umów wizytę</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg bg-white/20 text-white hover:bg-white/30">
                <Link href="/o-nas">Poznaj nas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {events.map((event, index) => {
        // Generujemy dynamiczny kolor tła na podstawie indeksu
        const bgColors = [
          "from-blue-600/80 to-blue-400/40",
          "from-green-600/80 to-green-400/40",
          "from-purple-600/80 to-purple-400/40",
          "from-red-600/80 to-red-400/40",
          "from-amber-600/80 to-amber-400/40",
        ]
        const bgColor = bgColors[index % bgColors.length]

        return (
          <div
            key={event.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: index === current ? 1 : 0 }}
          >
            <Image
              src={`/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(event.summary)}`}
              alt={event.summary}
              fill
              className="object-cover"
              priority
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${bgColor} flex flex-col justify-center px-4 sm:px-6 lg:px-8`}
            >
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{event.summary}</h2>
                <p className="text-xl text-white mb-2 flex items-center justify-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {format(parseISO(event.start.date), "EEEE, d MMMM yyyy", { locale: pl })}
                </p>
                {event.description && (
                  <div
                    className="text-lg text-white mb-8 max-h-32 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="text-lg">
                    <Link href={`/kalendarz?date=${event.start.date}`}>Szczegóły</Link>
                  </Button>
                  {event.location && (
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="text-lg bg-white/20 text-white hover:bg-white/30"
                    >
                      <Link href={`https://maps.google.com/?q=${encodeURIComponent(event.location)}`} target="_blank">
                        Zobacz lokalizację
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}

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

