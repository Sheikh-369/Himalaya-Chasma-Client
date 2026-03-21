import { Status } from "@/lib/global/type";

export interface IUserData {
  id?:string;
  userName?: string;
  userEmail: string;
  whatsAppNumber?: string;
  userPassword?: string;
  confirmPassword?:string;
  profileImage?: string;
  city?: string;
  district?: string;
  OTP?:string;
  newPassword?:string;
  confirmNewPassword?:string;
  role?:string;
};

export interface IUserSliceState{
    userData:IUserData[],
    selectedUser: IUserData | null; 
    status:Status
}
// export interface IUserSliceState {
//   userData: IUserData[] | null; // allow null
//   selectedUser: IUserData | null;
//   status: Status;
// }