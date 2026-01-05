
export enum Language {
  EN = 'en',
  MR = 'mr',
  HI = 'hi'
}

export interface Location {
  lat: number;
  lng: number;
  village?: string;
  city: string;
  district: string;
  state: string;
  country: string;
  address: string;
}

export interface Facilities {
  mudAkhada: boolean;
  wrestlingMat: boolean;
  equipment: string[]; // e.g., ['Gada', 'Mugdar', 'Dumbbells', 'Rope']
}

export interface Achievement {
  level: 'District' | 'State' | 'National' | 'International';
  description: string;
  year: number;
}

export interface Talim {
  id: string;
  name: string;
  ustadName: string;
  phoneNumber: string;
  location: Location;
  facilities: Facilities;
  timings: string;
  achievements: Achievement[];
  images: string[];
  rating: number;
  reviewsCount: number;
  status: 'pending' | 'approved' | 'rejected';
  addedBy: string;
}

export interface Review {
  id: string;
  talimId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface KushtiEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  organizer: string;
  image?: string;
}
