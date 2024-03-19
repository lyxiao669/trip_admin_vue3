interface Orders {
  id: number,
  userId: number,
  spotId: number,
  status: number,
  orderDate: string
}
interface OrderDetailResult {
  id: number;
  status: number;
  orderDate: string;
  userId: number;
  userName: string;
  avatar: string;
  spotId: number;
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
  timestamp: string;
}
