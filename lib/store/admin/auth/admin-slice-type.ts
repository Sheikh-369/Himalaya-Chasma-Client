import { Status } from "@/lib/global/type";

export interface IAdminData {
  id:string;
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

export interface IAdminSliceState{
    adminData:IAdminData[],
    selectedUser: IAdminData | null; 
    status:Status
}