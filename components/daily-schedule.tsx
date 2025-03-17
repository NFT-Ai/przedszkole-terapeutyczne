"use client"

import { useState, useEffect } from "react"
import { format, addDays, subDays, parseISO } from "date-fns"
import { pl } from "date-fns/locale"
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CalendarEvent {
  id: string
  summary: string
  description?: string
  start: {
    dateTime?: string
    date?: string
  }
  end: {
    dateTime?: string
    date?: string
  }
  location?: string
  isAllDay?: boolean
}

export default function DailySchedule() {
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_KEY = "AIzaSyC4Cliuc_Zru4OXCkA3uhKIRWrlozwih5I"
  const CALENDAR_ID = "40f318b3012cbfe5df4b48cebc912d5de43070e3d33c01050188110a53a3adda@group.calendar.google.com"

  const fetchEvents = async () => {
    setLoading(true)
    setError(null)
    try {
      const timeMin = new Date(date)
      timeMin.setHours(0, 0, 0, 0)

      const timeMax = new Date(date)
      timeMax.setHours(23, 59, 59, 999)

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        CALENDAR_ID,
      )}/events?key=${API_KEY}&timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}&singleEvents=true&orderBy=startTime`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Błąd pobierania danych: ${response.status}`)
      }

      const data = await response.json()

      if (data.items) {
        // Przetwarzamy wydarzenia, oznaczając całodniowe
        const processedEvents = data.items
          .filter(
            (event: CalendarEvent) =>
              event.start &&
              (event.start.dateTime || event.start.date) &&
              event.end &&
              (event.end.dateTime || event.end.date),
          )
          .map((event: CalendarEvent) => ({
            ...event,
            isAllDay: Boolean(event.start.date && !event.start.dateTime),
          }))

        setEvents(processedEvents)
      }
    } catch (error) {
      console.error("Błąd podczas pobierania wydarzeń:", error)
      setError("Nie udało się pobrać planu dnia. Spróbuj ponownie później.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [date])

  const goToPreviousDay = () => {
    setDate(subDays(date, 1))
  }

  const goToToday = () => {
    setDate(new Date())
  }

  const goToNextDay = () => {
    setDate(addDays(date, 1))
  }

  const formatEventTime = (dateTimeString?: string, dateString?: string, isAllDay?: boolean) => {
    if (isAllDay) {
      return "Cały dzień"
    }

    if (!dateTimeString && !dateString) {
      return "Cały dzień"
    }

    if (dateTimeString) {
      try {
        return format(parseISO(dateTimeString), "HH:mm", { locale: pl })
      } catch (error) {
        console.error("Błąd formatowania czasu:", error)
        return "Czas nieokreślony"
      }
    }

    return "Cały dzień"
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">Plan dnia</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={goToPreviousDay}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Wczoraj
            </Button>
            <Button variant="outline" onClick={goToToday}>
              Dzisiaj
            </Button>
            <Button variant="outline" onClick={goToNextDay}>
              Jutro
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="mb-8 text-center">
          <h3 className="text-2xl font-semibold flex items-center justify-center">
            <Calendar className="h-6 w-6 mr-2" />
            {format(date, "EEEE, d MMMM yyyy", { locale: pl })}
          </h3>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4">Ładowanie planu dnia...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <p className="text-red-600">{error}</p>
            <Button onClick={() => fetchEvents()} className="mt-4">
              Spróbuj ponownie
            </Button>
          </div>
        ) : events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      <span className="text-lg font-medium">
                        {formatEventTime(event.start.dateTime, event.start.date, event.isAllDay)}
                        {!event.isAllDay && ` - ${formatEventTime(event.end.dateTime, event.end.date)}`}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold">{event.summary}</h4>
                      {event.description && (
                        <div
                          className="text-muted-foreground mt-2"
                          dangerouslySetInnerHTML={{ __html: event.description }}
                        />
                      )}
                      {event.location && (
                        <p className="text-sm text-muted-foreground mt-1">Lokalizacja: {event.location}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-lg">Brak zaplanowanych zajęć na ten dzień</p>
          </div>
        )}
      </div>
    </section>
  )
}

