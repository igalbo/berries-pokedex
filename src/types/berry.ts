// Simplified types for our berries pokedex

export interface BerryFlavor {
  potency: number;
  flavor: {
    name: string;
    url: string;
  };
}

export interface Berry {
  id: number;
  name: string;
  firmness: {
    name: string;
    url: string;
  };
  flavors: BerryFlavor[];
}

export interface BerryListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

// Processed berry interface for our app
export interface ProcessedBerry {
  id: number;
  name: string;
  firmness: string;
  flavors: string[]; // Only flavors with potency > 0
}

// Firmness levels we'll use in our app
export type FirmnessLevel = 
  | "very-soft"
  | "soft" 
  | "hard"
  | "very-hard"
  | "super-hard";

// Cache interface
export interface BerriesCache {
  data: ProcessedBerry[];
  timestamp: number;
  expiresAt: number;
}
