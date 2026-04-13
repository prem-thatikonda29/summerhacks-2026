import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'h9q3fpz7',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})
