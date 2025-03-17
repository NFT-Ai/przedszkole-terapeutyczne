import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Testimonials from "@/components/testimonials"
import Gallery from "@/components/gallery"
import Programs from "@/components/programs"
import SpecialDaysSlider from "@/components/special-days-slider"
import DailySchedule from "@/components/daily-schedule"
import { client } from "@/lib/sanity"

async function getSpecialEvents() {
  try {
    return await client.fetch(`
      *[_type == "specialEvent" && featured == true] | order(eventDate asc) {
        _id,
        title,
        slug,
        eventDate,
        bannerImage,
        description,
        registrationLink
      }
    `)
  } catch (error) {
    console.error("Błąd podczas pobierania wydarzeń specjalnych:", error)
    return []
  }
}

export default async function Home() {
  const specialEvents = (await getSpecialEvents()) || []

  return (
    <div className="flex flex-col min-h-screen">
      {/* Slider dni specjalnych z Google Calendar */}
      <Suspense
        fallback={
          <section className="relative w-full h-[500px] md:h-[600px] bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4">Ładowanie wydarzeń specjalnych...</p>
            </div>
          </section>
        }
      >
        <SpecialDaysSlider />
      </Suspense>

      {/* Info Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Godziny otwarcia</h3>
                <p className="text-muted-foreground">Poniedziałek - Piątek: 7:00 - 17:00</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Phone className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Kontakt</h3>
                <p className="text-muted-foreground">Tel: +48 123 456 789</p>
                <p className="text-muted-foreground">Email: kontakt@radosnyswiat.pl</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Lokalizacja</h3>
                <p className="text-muted-foreground">ul. Terapeutyczna 5</p>
                <p className="text-muted-foreground">00-000 Warszawa</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Plan dnia z Google Calendar */}
      <Suspense fallback={<div className="py-16 text-center">Ładowanie planu dnia...</div>}>
        <DailySchedule />
      </Suspense>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">O naszym przedszkolu</h2>
              <p className="text-lg mb-4">
                Przedszkole Terapeutyczne "Radosny Świat" to miejsce, gdzie każde dziecko otrzymuje indywidualną opiekę
                dostosowaną do jego potrzeb rozwojowych.
              </p>
              <p className="text-lg mb-6">
                Nasz zespół składa się z wykwalifikowanych terapeutów, psychologów, logopedów i pedagogów specjalnych,
                którzy wspólnie tworzą kompleksowy program terapeutyczny dla każdego dziecka.
              </p>
              <Button asChild>
                <Link href="/o-nas" className="flex items-center">
                  Dowiedz się więcej <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Sala terapeutyczna"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <Programs />

      {/* Gallery Section */}
      <Gallery />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Zapraszamy do naszego przedszkola</h2>
          <p className="text-xl mb-8">Umów wizytę i przekonaj się, jak możemy pomóc Twojemu dziecku w rozwoju</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link href="/kontakt">Umów wizytę</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white/20">
              <Link href="/kalendarz">
                <Calendar className="mr-2 h-5 w-5" /> Zobacz kalendarz wydarzeń
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

