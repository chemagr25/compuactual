export interface ServiceResponse {
    content:          Service[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    numberOfElements: number;
    first:            boolean;
    sort:             Sort;
    size:             number;
    number:           number;
    empty:            boolean;
}

export interface Service {
    id:            number;
    description:   string;
    invoice:       string;
    idDevice:      number;
    dateReceived:  Date;
    idClient:      number;
    idTechnician:  number;
    comments:      any[];
    dateDelivered: null;
    price:         number;
    finalPrice:    null;
    status:        string;
    observation:   string;
}

export interface Pageable {
    sort:       Sort;
    pageNumber: number;
    pageSize:   number;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    sorted:   boolean;
    unsorted: boolean;
    empty:    boolean;
}