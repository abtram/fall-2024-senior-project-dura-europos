export type Latlong = [number, number];

export interface Location {
  key: string;
  name: string;
  latlong: Latlong;
  image: string;
  description: string;
}
