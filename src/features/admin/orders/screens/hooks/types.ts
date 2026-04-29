export interface UpdateSelected {
  title: string;
  coordinates: { latitude: string; location: string; longitude: string }[];
  id: string;
  time: string;
  note?: string;
}
