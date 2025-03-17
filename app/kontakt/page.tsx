import { Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary py-16 px-4 sm:px-6 lg:px-8 text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Skontaktuj się z nami</h1>
          <p className="text-xl">Jesteśmy tutaj, aby odpowiedzieć na Twoje pytania i pomóc Twojemu dziecku</p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Phone className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Telefon</h3>
                <p className="text-muted-foreground">+48 123 456 789</p>
                <p className="text-muted-foreground">Pon-Pt: 8:00 - 16:00</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Mail className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">kontakt@radosnyswiat.pl</p>
                <p className="text-muted-foreground">rekrutacja@radosnyswiat.pl</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Adres</h3>
                <p className="text-muted-foreground">ul. Terapeutyczna 5</p>
                <p className="text-muted-foreground">00-000 Warszawa</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Napisz do nas</h2>
              <p className="text-lg mb-8">
                Wypełnij formularz, a nasz zespół skontaktuje się z Tobą najszybciej jak to możliwe.
              </p>
              <ContactForm />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Nasza lokalizacja</h2>
              <p className="text-lg mb-8">
                Znajdujemy się w dogodnej lokalizacji, z łatwym dostępem do komunikacji miejskiej i parkingiem dla
                rodziców.
              </p>
              <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Mapa Google</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Często zadawane pytania</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Jak wygląda proces rekrutacji?</h3>
              <p className="text-muted-foreground">
                Proces rekrutacji rozpoczyna się od kontaktu telefonicznego lub mailowego. Następnie zapraszamy rodziców
                wraz z dzieckiem na spotkanie, podczas którego przeprowadzamy wstępną diagnozę i omawiamy możliwości
                terapeutyczne.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Jakie dokumenty są potrzebne do zapisu dziecka?</h3>
              <p className="text-muted-foreground">
                Do zapisu dziecka potrzebujemy: orzeczenia o potrzebie kształcenia specjalnego (jeśli dziecko je
                posiada), opinii psychologiczno-pedagogicznej, dokumentacji medycznej oraz wypełnionego formularza
                zgłoszeniowego.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Czy przedszkole oferuje transport?</h3>
              <p className="text-muted-foreground">
                Tak, oferujemy transport dla dzieci w granicach miasta. Szczegóły i koszty ustalane są indywidualnie z
                rodzicami.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Jakie są godziny pracy przedszkola?</h3>
              <p className="text-muted-foreground">
                Przedszkole jest czynne od poniedziałku do piątku w godzinach 7:00-17:00.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Czy przedszkole zapewnia wyżywienie?</h3>
              <p className="text-muted-foreground">
                Tak, zapewniamy pełne wyżywienie, uwzględniając indywidualne potrzeby dietetyczne dzieci, w tym diety
                eliminacyjne.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

