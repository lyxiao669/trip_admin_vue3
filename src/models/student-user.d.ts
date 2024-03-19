interface StudentUser {
  id: number;
  timestamp: string;
  fullName: string;
  mobile: string;
  school: string;
  grade: string;
  age: string;
  gender: string;
  qrCode: string;
  photo: string;
  compositePhoto: string;
  isSee: boolean;
  isPhoto: boolean;
  createTime: string;
}

interface UserVsion {
  id: number;
  fullName: string;
  mobile: string;
  leftEyeVision: string;
  rightEyeVision: string;
  leftEyeAstigmatism: string;
  rightEyeAstigmatism: string;
  leftEyePupilDistance: string;
  rightEyePupilDistance: string;
  leftEyeAxial: string;
  rightEyeAxial: string;
  doctorAdvice: string;
  createTime: string;
}

interface Achievement {
  id: number;
  userId: number;
  mark: number;
  result: string;
  createTime: string;
}