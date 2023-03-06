import { Timestamp } from "firebase/firestore";

export interface Location {
    country: string,
    province: string,
    area: string,
    startTime?: Timestamp
    endTime?: Timestamp
}

export interface Trip {
    id: string
    title: string;
    description: string;
    duration: string;
    price: string;
    locations: Location[]
    createdAt?: Timestamp;
    createdBy?: string;
    edited?: Timestamp;
}