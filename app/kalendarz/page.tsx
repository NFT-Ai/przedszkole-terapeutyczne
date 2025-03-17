"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import {
  format,
  parseISO,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react"
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

export default function CalendarPage() {
  const searchParams = useSearchParams()
  const dateParam = searchParams.get("date")

  const [currentMonth, setCurrentMonth] = useState(() => {
    if (dateParam) {
      try {
        return parseISO(dateParam)
      } catch (e) {
        return new Date()
      }
    }
    return new Date()
  })

  const [selectedDate, setSelectedDate] = useState(() => {
    if (dateParam) {
      try {
        return parseISO(dateParam)
      } catch (e) {
        return new Date()
      }
    }
    return new Date()
  })

  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [monthEvents, setMonthEvents] = useState<Record<string, CalendarEvent[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const API_KEY = "AIzaSyC4Cliuc_Zru4OXCkA3uhKIRWrlozwih5I"
  const CALENDAR_ID = "40f318b3012cbfe5df4b48cebc912d5de43070e3d33c01050188110a53a3adda@group.calendar.google.com"

  // Pobieranie wydarzeń dla wybranego miesiąca
  useEffect(() => {
    const fetchMonthEvents = async () => {
      setLoading(true)
      setError(null)
      try {
        const start = startOfMonth(currentMonth)
        const end = endOfMonth(currentMonth)

        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          CALENDAR_ID,
        )}/events?key=${API_KEY}&timeMin=${start.toISOString()}&timeMax=${end.toISOString()}&singleEvents=true&orderBy=startTime`

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

          // Grupujemy wydarzenia według dat
          const eventsByDate: Record<string, CalendarEvent[]> = {}

          processedEvents.forEach((event: CalendarEvent) => {
            const dateKey = event.start.date || event.start.dateTime?.split("T")[0] || ""
            if (!eventsByDate[dateKey]) {
              eventsByDate[dateKey] = []
            }
            eventsByDate[dateKey].push(event)
          })

          setMonthEvents(eventsByDate)

          // Ustawiamy wydarzenia dla wybranego dnia
          const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
          setEvents(eventsByDate[selectedDateStr] || [])
        }
      } catch (error) {
        console.error("Błąd podczas pobierania wydarzeń:", error)
        setError("Nie udało się pobrać wydarzeń. Spróbuj ponownie później.")
      } finally {
        setLoading(false)
      }
    }

    fetchMonthEvents()
  }, [currentMonth, selectedDate])

  // Pobieranie wydarzeń dla wybranego dnia
  useEffect(() => {
    if (monthEvents) {
      const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
      setEvents(monthEvents[selectedDateStr] || [])
    }
  }, [selectedDate, monthEvents])

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
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

  // Generowanie dni miesiąca
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-16 px-4 sm:px-6 lg:px-8 text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Kalendarz wydarzeń</h1>
          <p className="text-xl">Sprawdź nadchodzące wydarzenia i zajęcia w naszym przedszkolu</p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Calendar Navigation */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <Button variant="outline" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">{format(currentMonth, "LLLL yyyy", { locale: pl })}</h2>
                  <Button variant="outline" onClick={goToNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"].map((day) => (
                    <div key={day} className="text-center font-medium text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {/* Wypełniamy puste miejsca przed pierwszym dniem miesiąca */}
                  {Array.from({ length: (startOfMonth(currentMonth).getDay() + 6) % 7 }).map((_, i) => (
                    <div key={`empty-start-${i}`} className="h-10 rounded-md"></div>
                  ))}

                  {/* Dni miesiąca */}
                  {daysInMonth.map((day) => {
                    const dateStr = format(day, "yyyy-MM-dd")
                    const hasEvents = Boolean(monthEvents[dateStr]?.length)
                    const isSelected = isSameDay(day, selectedDate)
                    const isTodayDate = isToday(day)

                    return (
                      <button
                        key={dateStr}
                        className={`h-10 rounded-md flex items-center justify-center text-sm relative
                          ${isSelected ? "bg-primary text-white" : isTodayDate ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}
                        `}
                        onClick={() => setSelectedDate(day)}
                      >
                        {format(day, "d")}
                        {hasEvents && (
                          <span
                            className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-primary"}`}
                          ></span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Events for Selected Day */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <CalendarIcon className="h-6 w-6 mr-2 text-primary" />
                  {format(selectedDate, "EEEE, d MMMM yyyy", { locale: pl })}
                </h2>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="mt-4">Ładowanie wydarzeń...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12 bg-red-50 rounded-lg">
                    <p className="text-red-600">{error}</p>
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
                    <p className="text-lg">Brak zaplanowanych wydarzeń na ten dzień</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

