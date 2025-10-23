import createImageUrlBuilder from '@sanity/image-url'
import {sanity} from './sanity.client'

export const urlFor = (src: any) => createImageUrlBuilder(sanity).image(src)
