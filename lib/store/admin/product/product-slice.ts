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
// export function createProduct(productData: IProductData) {
//   return async function (dispatch: AppDispatch) {
//     dispatch(setStatus(Status.LOADING));
//     try {
//       const response = await API.post("product", productData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.status === 200 || response.status === 201) {
//         dispatch(setStatus(Status.SUCCESS));
//         dispatch(fetchAllProducts());
//       } else {
//         dispatch(setStatus(Status.ERROR));
//       }
//     } catch (error) {
//       dispatch(setStatus(Status.ERROR));
//     }
//   };
// }
export function createProduct(productData: IProductData, files?: File[]) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const formData = new FormData();
      
      formData.append('name', productData.name);
      formData.append('price', String(productData.price));
      formData.append('category', productData.category);
      formData.append('description', productData.description);
      
      // ADD THESE MISSING FIELDS:
      if (productData.brand) formData.append('brand', productData.brand);
      if (productData.badge) formData.append('badge', productData.badge);
      if (productData.alt) formData.append('alt', productData.alt);
      
      // Handle the null/optional originalPrice
      if (productData.originalPrice) {
        formData.append('originalPrice', String(productData.originalPrice));
      }

      formData.append('rating', String(productData.rating || 0));
      formData.append('reviews', String(productData.reviews || 0));

      // Stringify JSONB fields
      formData.append('features', JSON.stringify(productData.features || []));
      formData.append('frameDetails', JSON.stringify(productData.frameDetails || []));

      // Files
      if (files && files.length > 0) {
        files.forEach((file) => formData.append('gallery', file));
      }

      const response = await APIWITHTOKEN.post("product", formData);
      if (response.status === 201 || response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchAllProducts());
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Update product
// export function updateProduct(id: string, productData: IProductData) {
//   return async function (dispatch: AppDispatch) {
//     dispatch(setStatus(Status.LOADING));
//     try {
//       const response = await APIWITHTOKEN.patch(
//         `product/${id}`,
//         productData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (response.status === 200) {
//         dispatch(setStatus(Status.SUCCESS));
//         dispatch(fetchAllProducts());
//       } else {
//         dispatch(setStatus(Status.ERROR));
//       }
//     } catch (error) {
//       dispatch(setStatus(Status.ERROR));
//     }
//   };
// }
export function updateProduct(id: string, productData: IProductData, files?: File[]) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const formData = new FormData();

      // 1. Append basic fields
      formData.append('name', productData.name);
      formData.append('brand', productData.brand || '');
      formData.append('price', String(productData.price));
      formData.append('originalPrice', String(productData.originalPrice || ''));
      formData.append('category', productData.category);
      formData.append('description', productData.description || '');
      formData.append('badge', productData.badge || '');
      formData.append('alt', productData.alt || '');
      formData.append('rating', String(productData.rating || 0));
      formData.append('reviews', String(productData.reviews || 0));
      
      // 2. Stringify Arrays for Multer
      formData.append('features', JSON.stringify(productData.features));
      formData.append('frameDetails', JSON.stringify(productData.frameDetails));

      // 3. Append Files to 'gallery' (The backend picks the first as main)
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append('gallery', file);
        });
      }

      const response = await APIWITHTOKEN.patch(`product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchAllProducts());
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