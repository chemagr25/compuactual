import type { Pageable, Sort } from './service'

export interface ClientResponse {
  content: Client[]
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

export interface Client {
  id: number
  name: string
  lastName: string
  phone: string
  email: string
  username: string
  services: ClientService[]
}

export interface ClientService {
  id: number
  invoice: string
}
