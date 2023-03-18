import { Timestamp } from "firebase/firestore";

export interface Review {
  id: string;
  createdAt: Timestamp;
  edited: Timestamp;
  createdBy: string;
  title: string;
  text: string;
  upvotes: number;
  rating: number;
}

export interface Location {
  country: string;
  province: string;
  area: string;
}

export interface Trip {
  id: string;
  createdAt: Timestamp;
  edited: Timestamp;
  title: string;
  description: string;
  duration: string;
  price: string;
  createdBy: string;
  locations: Location[];
  relevanceScore?: number;
}

export interface User {
  id?: string;
  createdAt?: Timestamp;
  lastLogin?: Timestamp;
  username: string;
  fullname: string;
  email: string;
  profilepicture: string;
  trips?: string[];
  liked?: string[];
  favorited?: string[];
  rated?: string[]
}

export interface RatingInterface {
  ratingId: string;
  tripId: string;
  createdBy: string;
  createdAt: Timestamp;
  edited: Timestamp;
  text: string;
  rating: number;
}
