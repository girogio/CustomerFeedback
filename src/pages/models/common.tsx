export enum Location {
  Burmarrad = "Burmarrad",
  Gzira = "Gzira",
  Sliema = "Sliema",
  Valletta = "Valletta",
  Bugibba = "Bugibba",
}

interface Rating {
  value: number;
  color: string;
}

export interface Review {
  date_created?: Date;
  rating: number;
  location: Location;
}

export const Ratings: Rating[] = [
  {
    value: 1,
    color: "#6A2135",
  },
  {
    value: 2,
    color: "#C13C37",
  },
  {
    value: 3,
    color: "#E38627",
  },
  {
    value: 4,
    color: "#f0f000",
  },
  {
    value: 5,
    color: "#00ffff",
  },
];
