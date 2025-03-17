import Image from "next/image"
import Link from "next/link"
import { Award, BookOpen, Heart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import TeamMembers from "@/components/team-members"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Zespół przedszkola terapeutycznego"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">O Nas</h1>
            <p className="text-xl text-white">Poznaj naszą misję, wartości i zespół</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Dzieci podczas zajęć terapeutycznych"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Nasza misja</h2>
              <p className="text-lg mb-4">
                Misją Przedszkola Terapeutycznego "Radosny Świat" jest stworzenie bezpiecznego, wspierającego
                środowiska, w którym każde dziecko może rozwijać swój potencjał niezależnie od wyzwań, z jakimi się
                zmaga.
              </p>
              <p className="text-lg mb-6">
                Wierzymy, że każde dziecko zasługuje na indywidualne podejście, szacunek i profesjonalną opiekę, która
                pomoże mu osiągnąć niezależność i radość z życia.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Heart className="h-6 w-6 text-primary mr-2 mt-1" />
                  <div>
                    <h3 className="font-semibold">Troska</h3>
                    <p className="text-muted-foreground">Dbamy o emocjonalne bezpieczeństwo</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BookOpen className="h-6 w-6 text-primary mr-2 mt-1" />
                  <div>
                    <h3 className="font-semibold">Edukacja</h3>
                    <p className="text-muted-foreground">Dostosowana do potrzeb</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-6 w-6 text-primary mr-2 mt-1" />
                  <div>
                    <h3 className="font-semibold">Jakość</h3>
                    <p className="text-muted-foreground">Najwyższe standardy terapii</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-primary mr-2 mt-1" />
                  <div>
                    <h3 className="font-semibold">Współpraca</h3>
                    <p className="text-muted-foreground">Z rodzicami i specjalistami</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Nasze podejście terapeutyczne</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Terapia integracji sensorycznej</h3>
                <p className="text-muted-foreground mb-4">
                  Pomagamy dzieciom w prawidłowym przetwarzaniu bodźców sensorycznych, co wpływa na poprawę
                  koncentracji, koordynacji i umiejętności uczenia się.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Terapia logopedyczna</h3>
                <p className="text-muted-foreground mb-4">
                  Wspieramy rozwój mowy i komunikacji, pomagając dzieciom w przezwyciężaniu trudności związanych z
                  artykulacją, rozumieniem i ekspresją językową.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Terapia psychologiczna</h3>
                <p className="text-muted-foreground mb-4">
                  Oferujemy wsparcie emocjonalne i behawioralne, pomagając dzieciom w rozwijaniu umiejętności
                  społecznych i radzeniu sobie z trudnymi emocjami.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Terapia pedagogiczna</h3>
                <p className="text-muted-foreground mb-4">
                  Wspieramy rozwój umiejętności poznawczych i edukacyjnych, dostosowując metody nauczania do
                  indywidualnych potrzeb każdego dziecka.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Terapia ręki</h3>
                <p className="text-muted-foreground mb-4">
                  Rozwijamy sprawność manualną i grafomotoryczną, co jest kluczowe dla nauki pisania i wykonywania
                  codziennych czynności.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Terapia przez zabawę</h3>
                <p className="text-muted-foreground mb-4">
                  Wykorzystujemy naturalną aktywność dziecka, jaką jest zabawa, do rozwijania umiejętności społecznych,
                  emocjonalnych i poznawczych.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamMembers />

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Chcesz dowiedzieć się więcej?</h2>
          <p className="text-xl mb-8">Zapraszamy do kontaktu lub odwiedzenia naszego przedszkola</p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link href="/kontakt">Skontaktuj się z nami</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

