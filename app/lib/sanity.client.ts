import {createClient} from 'next-sanity'

export const sanity = createClient({
  projectId: '658tue2o',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})
