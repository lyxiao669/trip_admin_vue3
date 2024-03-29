interface ScenicSpot {
  id: number;
  spotName: string;
  provinceName: string;
  cityName: string;
  likes: number;
  description: string;
  ticketPrice: number; 
  latitude: number;
  longitude: number;
  images: string;
  address: string;
  telephone: string;
  openingHours: string;
  location: [number, number]; // [经度,纬度]
}
