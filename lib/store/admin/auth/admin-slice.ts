import { Status } from "@/lib/global/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import { IAdminData, IAdminSliceState } from "./admin-slice-type";
import APIWITHTOKEN from "@/lib/http/APIWithToken";


const initialState:IAdminSliceState={
    adminData:[],
    selectedUser: null,
    status:Status.IDLE
}

const adminSlice=createSlice({
    name:"adminSlice",
    initialState,
    reducers:{
        setAdmin(state:IAdminSliceState, action:PayloadAction<IAdminData[]>){
            state.adminData=action.payload
        },

        setSelectedUser(state:IAdminSliceState, action: PayloadAction<IAdminData | null>) {
          state.selectedUser = action.payload;
        },

        setStatus(state:IAdminSliceState, action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setAdmin,setSelectedUser, setStatus}=adminSlice.actions
export default adminSlice.reducer

//fetch all users
export function fetchAllUsers() {
  return async function fetchAllUsersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING))

    try {
      const response = await APIWITHTOKEN.get("/auth/users")

      if (response.status === 200) {
        dispatch(setAdmin(response.data.data))//for fetching all users
        dispatch(setStatus(Status.SUCCESS))

        return {
          success: true,
          message: response.data.message
        }
      } else {
        dispatch(setStatus(Status.ERROR))
        return {
          success: false,
          message: response.data.message || "Failed to fetch users"
        }
      }

    } catch (error: any) {
      console.log(error)
      dispatch(setStatus(Status.ERROR))

      return {
        success: false,
        message: error.response?.data?.message || "Fetching users failed"
      }
    }
  }
}

//fetch user by id
export function fetchUserById(id: string) {
  return async function fetchUserByIdThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await APIWITHTOKEN.get(`/auth/user/${id}`);

      if (response.status === 200) {
        dispatch(setSelectedUser(response.data.data));  // ✅ IMPORTANT
        dispatch(setStatus(Status.SUCCESS));

        return {
          success: true,
          message: response.data.message
        };
      } else {
        dispatch(setStatus(Status.ERROR));
        return {
          success: false,
          message: response.data.message || "Failed to fetch user"
        };
      }

    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));

      return {
        success: false,
        message: error.response?.data?.message || "Fetching user failed"
      };
    }
  };
}