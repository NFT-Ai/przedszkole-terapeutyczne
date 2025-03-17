import { client } from "@/lib/sanity"
import { Card, CardContent } from "@/components/ui/card"

async function getTestimonials() {
  try {
    return await client.fetch(`
      *[_type == "testimonial"] | order(rating desc) [0...3] {
        _id,
        content,
        author,
        role,
        rating
      }
    `)
  } catch (error) {
    console.error("Błąd podczas pobierania opinii:", error)
    return []
  }
}

export default async function Testimonials() {
  const testimonials = (await getTestimonials()) || []

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Co mówią rodzice</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Poznaj opinie rodziców, których dzieci uczęszczają do naszego przedszkola
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial._id} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="flex text-primary">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-center mb-6 italic">"{testimonial.content}"</p>
                <div className="text-center">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

