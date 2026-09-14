

export interface ISiteConfigPayload {
  email: string
  schoolName: string
  address: string
  eiin: string
  estdYear: string
  theme: {}

  facebookUrl?: string
  youtubeUrl?: string
  linkdinUrl?: string
  twitterUrl?: string
  instagramUrl?: string
}



export interface ISiteConfigUpdate {
  email?: string
  schoolName?: string
  address?: string
  eiin?: string
  estdYear?: string
  theme?: {}

  facebookUrl?: string
  youtubeUrl?: string
  linkdinUrl?: string
  twitterUrl?: string
  instagramUrl?: string
}