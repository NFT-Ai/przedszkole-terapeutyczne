import Image from "next/image"
import { urlFor, client } from "@/lib/sanity"

async function getTeamMembers() {
  try {
    return await client.fetch(`
      *[_type == "teamMember"] | order(order asc) {
        _id,
        name,
        role,
        image,
        description
      }
    `)
  } catch (error) {
    console.error("Błąd podczas pobierania członków zespołu:", error)
    return []
  }
}

export default async function TeamMembers() {
  const team = (await getTeamMembers()) || []

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nasz zespół</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Nasz zespół składa się z wykwalifikowanych specjalistów z pasją do pracy z dziećmi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member._id} className="flex flex-col items-center text-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                <Image
                  src={member.image ? urlFor(member.image).url() : "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-muted-foreground">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

