import { createClient } from "next-sanity"

export const client = createClient({
  projectId: "78zd0pdp", // Zastąp swoim ID projektu z Sanity
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
})

