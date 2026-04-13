import {client} from './sanity'
import {REVEAL_TIME} from './config'

export type SanityPerson = {
  _id: string
  name: string
  about: string
  photo: string | null
  linkedinUrl: string
  color: string
  order: number
}

export type SanityPartner = {
  _id: string
  name: string
  about: string
  logo: string | null
  websiteUrl: string
  color: string
  partnerType: string
  order: number
}

export async function getMentors(): Promise<SanityPerson[]> {
  try {
    const data = await client.fetch(
      `*[_type == "mentor"] | order(order asc) {
        _id, name, about,
        "photo": photo.asset->url,
        linkedinUrl, color, order
      }`,
      {},
      {next: {revalidate: 300, tags: ['sanity']}},
    )
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function getJudges(): Promise<SanityPerson[]> {
  try {
    const data = await client.fetch(
      `*[_type == "judge"] | order(order asc) {
        _id, name, about,
        "photo": photo.asset->url,
        linkedinUrl, color, order
      }`,
      {},
      {next: {revalidate: 300, tags: ['sanity']}},
    )
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function getPartners(): Promise<SanityPartner[]> {
  try {
    const data = await client.fetch(
      `*[_type == "partner"] | order(order asc) {
        _id, name, about,
        "logo": logo.asset->url,
        websiteUrl, color, partnerType, order
      }`,
      {},
      {next: {revalidate: 300, tags: ['sanity']}},
    )
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export type ProblemStatement = {
  _id: string
  title: string
  description: string
  track: string
  order?: number
}

export async function getProblemStatements(track: string): Promise<ProblemStatement[]> {
  if (new Date() < REVEAL_TIME) return []
  try {
    const data = await client.fetch(
      `*[_type == "problemStatement" && track == $track] | order(order asc) {
        _id, title, description, track, order
      }`,
      {track},
      {next: {revalidate: 60, tags: ['sanity']}},
    )
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}
