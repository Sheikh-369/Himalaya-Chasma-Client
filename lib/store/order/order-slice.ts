import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/lib/global/type";
import API from "@/lib/http/API";
import { ICreateOrderPayload, IOrderData, IOrderSliceState } from "./order-slice-type";
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

export const { setOrders, setSingleOrder, setStatus } =
  orderSlice.actions;

export default orderSlice.reducer;

/* ================= THUNKS ================= */

/**
 * ✅ Create Order
 */
export function createOrder(orderData: ICreateOrderPayload) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.post("order", orderData);

      if (response.status === 200 || response.status === 201) {
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
 * ✅ Cancel Order (Customer)
 */
export function cancelOrder(id: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.patch(`order-cancel/${id}`);

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
 * ✅ Update Order Status (Admin)
 */
export function updateOrderStatus(id: string, statusValue: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await API.patch(`order-status/${id}`, {
        status: statusValue,
      });

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