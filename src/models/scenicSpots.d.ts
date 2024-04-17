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
  notice: string;
  location: [number, number]; // [经度,纬度]
  KeyWord:string; //查询关键词
  area:[string,string]//省市区数据
}
