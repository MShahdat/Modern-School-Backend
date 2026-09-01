import { StaffDesignation, UserStatus } from "../../../../generated/prisma/enums"

interface PresentAddress {
  [key: string]: string
}

interface PermanentAddress {
  [key: string]: string
}

export interface IStaffPayload {
  staff_id: string
  name: string
  email: string
  designation?: StaffDesignation
  startingDate?: string
  endingDate?: string
  qualification?: string
  experience?: string

  fatherName?: string
  motherName?: string
  nationalId?: string
  phone?: string
  bio?: string

  presentAddress?: PresentAddress
  permanemtAddress?: PermanentAddress
}

export interface IUpdateStaffPayload {
  staff_id?: string
  name?: string
  email?: string
  designation?: StaffDesignation
  startingDate?: string
  endingDate?: string
  qualification?: string
  experience?: string

  fatherName?: string
  motherName?: string
  nationalId?: string
  phone?: string
  bio?: string

  presentAddress?: PresentAddress
  permanentAddress?: PermanentAddress
}