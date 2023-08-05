export interface ServiceResponse {
  content: Service[]
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

export interface Service {
  id: number
  description: string
  invoice: string
  device: Device
  dateReceived: Date
  client: Person
  technician: Person
  comments: any[]
  dateDelivered: null
  price: number
  finalPrice: null
  status: string
  observation: string
}

export interface Person {
  id: number
  name: string
  lastName: string
}

export interface Device {
    id: number;
    brand: string;
    model: string;

}

export interface Pageable {
  sort: Sort
  pageNumber: number
  pageSize: number
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}
