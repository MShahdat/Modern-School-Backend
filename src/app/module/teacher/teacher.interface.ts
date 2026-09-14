import { EmploymentType, Gender, Group, TeacherDesignation } from "../../../../generated/prisma/enums"

interface Subject {
  class: string
  sub: string
  [key: string]: string
}


interface PresentAddress {
  [key: string]: string
}

interface PermanentAddress {
  [key: string]: string
}

export interface ITeacherPayload {
  teacherId: string
  name: string
  email: string
  designation: TeacherDesignation
  joiningDate: string
  endingDate?: string
  employmentType: EmploymentType
  salary?: number
  department: Group
  subject: Subject[]
  highestDegree?: string // "M.Sc", "Ph.D"
  specialization?: string
  experienceYears?: number

  fatherName?: string
  motherName?: string
  dateOfBirth?: string
  gender: Gender
  bloodGroup?: string
  religion?: string
  nationality?: string
  phone?: string

  presentAddress?: PresentAddress
  permanentAddress?: PermanentAddress

  bankName?: string
  bankAccount?: string
}




export interface IUpdateTeacherPayload {
  teacherId?: string
  name?: string
  email?: string
  designation?: TeacherDesignation
  joiningDate?: string
  endingDate?: string
  employmentType?: EmploymentType
  salary?: number
  department?: Group
  subject?: Subject[]
  highestDegree?: string // "M.Sc", "Ph.D"
  specialization?: string
  experienceYears?: number

  fatherName?: string
  motherName?: string
  dateOfBirth?: string
  bloodGroup?: string
  religion?: string
  nationality?: string
  phone?: string

  presentAddress?: PresentAddress
  permanentAddress?: PermanentAddress

  bankName?: string
  bankAccount?: string
}