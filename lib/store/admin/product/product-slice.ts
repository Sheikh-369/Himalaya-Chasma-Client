import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "@/lib/global/type";
import { AppDispatch } from "../../store";
import API from "@/lib/http/API";
import APIWITHTOKEN from "@/lib/http/APIWithToken";
import { IProductData, IProductSliceState } from "./product-slice-type";


/* ================= INITIAL STATE ================= */

const initialState: IProductSliceState = {
  products: [],
  singleProduct: null,
  featuredProducts: [],
  status: Status.IDLE,
  detailStatus: Status.IDLE, // NEW: Specific status for the single page
};

/* ================= SLICE ================= */

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IProductData[]>) {
      state.products = action.payload;
    },

    setSingleProduct(state, action: PayloadAction<IProductData | null>) {
      state.singleProduct = action.payload;
    },

    setFeaturedProducts(state, action: PayloadAction<IProductData[]>) {
      state.featuredProducts = action.payload;
    },

    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    setDetailStatus(state, action: PayloadAction<Status>) {
      state.detailStatus = action.payload;
    }

  },
});

export const {
  setProducts,
  setSingleProduct,
  setFeaturedProducts,
  setStatus,
  setDetailStatus
} = productSlice.actions;

export default productSlice.reducer;

/* ================= THUNKS ================= */

// Fetch all products
export function fetchAllProducts() {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("product");

      if (response.status === 200) {
        dispatch(setProducts(response.data.products));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Fetch single product
// export function fetchProductById(id: string) {
//   return async function (dispatch: AppDispatch) {
//     dispatch(setStatus(Status.LOADING));
//     try {
//       const response = await API.get(`product/${id}`);

//       if (response.status === 200) {
//         dispatch(setSingleProduct(response.data.product));
//         dispatch(setStatus(Status.SUCCESS));
//       } else {
//         dispatch(setStatus(Status.ERROR));
//       }
//     } catch (error) {
//       dispatch(setStatus(Status.ERROR));
//     }
//   };
// }
export function fetchProductById(id: string) {
  return async function (dispatch: AppDispatch) {
    // Use the specific detailStatus so it's independent
    dispatch(setDetailStatus(Status.LOADING));
    try {
      const response = await API.get(`product/${id}`);
      if (response.status === 200) {
        dispatch(setSingleProduct(response.data.product));
        dispatch(setDetailStatus(Status.SUCCESS));
      } else {
        dispatch(setDetailStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setDetailStatus(Status.ERROR));
    }
  };
}

// Fetch products by category
export function fetchProductsByCategory(category: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get(`product/${category}`);

      if (response.status === 200) {
        dispatch(setProducts(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Fetch featured products
export function fetchFeaturedProducts() {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("product/featured");

      if (response.status === 200) {
        dispatch(setFeaturedProducts(response.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Create product
export function createProduct(productData: IProductData) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("product", productData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 || response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchAllProducts());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Update product
export function updateProduct(id: string, productData: IProductData) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.patch(
        `product/${id}`,
        productData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchAllProducts());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Delete product
export function deleteProduct(id: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.delete(`product/${id}`);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchAllProducts());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}