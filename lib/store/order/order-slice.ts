import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/lib/global/type";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import { IOrderData, IOrderSliceState } from "./order-slice-type";
import { AppDispatch } from "../store";

/* ================= INITIAL STATE ================= */

const initialState: IOrderSliceState = {
  orders: [],
  singleOrder: null,
  status: Status.IDLE,
};

/* ================= SLICE ================= */

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<IOrderData[]>) {
      state.orders = action.payload;
    },

    setSingleOrder(state, action: PayloadAction<IOrderData | null>) {
      state.singleOrder = action.payload;
    },

    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setOrders, setSingleOrder, setStatus } = orderSlice.actions;

export default orderSlice.reducer;

/* ================= THUNKS ================= */

// Fetch all orders
export function fetchAllOrders() {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("order");

      if (response.status === 200) {
        dispatch(setOrders(response.data.orders));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Fetch single order
export function fetchOrderById(id: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get(`order/${id}`);

      if (response.status === 200) {
        dispatch(setSingleOrder(response.data.order));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

/**
 * Delete order by ID
 */
export function deleteOrderById(id: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete(`delete-order/${id}`);

      if (response.status === 200) {
        // Remove deleted order from local state
        dispatch(fetchAllOrders());
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}