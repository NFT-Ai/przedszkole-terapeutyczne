import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
  projectId: "your-project-id", // Zastąp swoim ID projektu z Sanity
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  if (!source) {
    return {
      url: () => "/placeholder.svg",
    }
  }
  return builder.image(source)
}

