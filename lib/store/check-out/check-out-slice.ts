import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/lib/global/type";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";
import APIWITHTOKEN from "@/lib/http/APIWithToken";

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

//place an order by user
export function createAnOrder(data: FormData) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.post("order", data, {
        headers: { "Content-Type": "multipart/form-data" },
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

//update order status by admin
export function updateOrderStatus(orderId: string,status: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await APIWITHTOKEN.patch(`order-status/${orderId}`,{ status });

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        return response.data; // optional but useful
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error(
        "❌ Update order failed:",
        error?.response?.data || error
      );
      dispatch(setStatus(Status.ERROR));
    }
  };
}