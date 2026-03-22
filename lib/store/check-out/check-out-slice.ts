import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/lib/global/type";
import { ICheckoutData } from "./check-out-slice-type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";

interface IOrderState {
  status: Status;
}

const initialState: IOrderState = {
  status: Status.IDLE,
};

const checkOutSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = checkOutSlice.actions;
export default checkOutSlice.reducer;

export function createAnOrder(data: ICheckoutData) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.post("order", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error("❌ Order failed:", error?.response?.data || error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}