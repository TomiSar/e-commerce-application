import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/add-product', product, {
        withCredentials: true,
      });
      //   console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (
    { itemsPerPage, currentPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-products?currentPage=${currentPage}&&searchValue=${searchValue}&&itemsPerPage=${itemsPerPage}`,
        { withCredentials: true }
      );
      //   console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-product/${productId}`, {
        withCredentials: true,
      });
      //   console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/update-product`, product, {
        withCredentials: true,
      });
      //   console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductImage = createAsyncThunk(
  'product/updateProductImage',
  async (
    { productId, oldImage, newImage },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('productId', productId);
      formData.append('oldImage', oldImage);
      formData.append('newImage', newImage);
      const { data } = await api.post('/update-product-image', formData, {
        withCredentials: true,
      });
      //   console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const productReducer = createSlice({
  name: 'product',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    products: [],
    product: '',
    totalProduct: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })

      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.totalProduct = payload.totalProduct;
      })

      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.product = payload.product;
      })

      .addCase(updateProduct.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.product = payload.product;
        state.successMessage = payload.message;
      })

      .addCase(updateProductImage.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.successMessage = payload.message;
      });
  },
});

export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
