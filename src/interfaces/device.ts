export interface Device {
    id:           number;
    brand:        string;
    model:        string;
    serialNumber: null;
    processor:    null;
    ram:          null;
    storage:      null;
    observations: null;
    parts:        Part[];
}

export interface Part {
    name:         string;
    description:  string;
    price:        number;
    quantity:     number;
    observations: string;
    deviceId:     number;
}
