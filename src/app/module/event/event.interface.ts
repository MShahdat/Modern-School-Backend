
export interface Gallery {
  file: string
  filePublicId: string
}

export interface IEventPayload {
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
}



export interface IUpdateEventPayload {
  title?: string
  description?: string
  startDate?: string
  endDate?: string
  location?: string
}