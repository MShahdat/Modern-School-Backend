import { CommitteeDesignation, UserStatus } from "../../../../generated/prisma/enums"

interface PresentAddress {
  [key: string]: string
}

interface PermanentAddress {
  [key: string]: string
}

export interface ICommitteePayload {
  committeeId: string
  name: string
  email: string
  designation?: CommitteeDesignation
  startingDate?: string
  endingDate?: string
  qualification?: string
  experience?: string
  message?: string

  fatherName?: string
  motherName?: string
  nationalId?: string
  phone?: string
  bio?: string

  presentAddress?: PresentAddress
  permanentAddress?: PermanentAddress
}

export interface IUpdateCommitteePayload {
  committeeId?: string
  name?: string
  email?: string
  designation?: CommitteeDesignation
  startingDate?: string
  endingDate?: string
  qualification?: string
  experience?: string
  message?: string

  fatherName?: string
  motherName?: string
  nationalId?: string
  phone?: string
  bio?: string

  presentAddress?: PresentAddress
  permanentAddress?: PermanentAddress
}