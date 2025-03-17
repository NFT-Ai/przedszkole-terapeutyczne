import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Gallery() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold">Nasza galeria</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Zobacz, jak wygląda codzienne życie w naszym przedszkolu
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link href="/galeria" className="flex items-center">
              Zobacz więcej <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Sala terapeutyczna"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Dzieci podczas zajęć"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Plac zabaw"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Zajęcia grupowe"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Sala integracji sensorycznej"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Zajęcia logopedyczne"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Zajęcia artystyczne"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Dzieci podczas zabawy"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

