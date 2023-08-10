import type { Pageable, Sort } from './service'

export interface TechResponse {
  content: Technician[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  numberOfElements: number
  first: boolean
  sort: Sort
  size: number
  number: number
  empty: boolean
}

export interface Technician {
  id: number
  name: string
  lastName: string
  phone: string
  email: string
  username: string
  services: TechService[]
}

export interface TechService {
  id: number
  invoice: string
}
