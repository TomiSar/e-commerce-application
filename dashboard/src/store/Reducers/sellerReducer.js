import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const getSellerRequest = createAsyncThunk(
  'seller/getSellerRequest',
  async (
    { itemsPerPage, currentPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-seller-request?currentPage=${currentPage}&&searchValue=${searchValue}&&itemsPerPage=${itemsPerPage}`,
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

export const getSeller = createAsyncThunk(
  'seller/getSeller',
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSellerStatus = createAsyncThunk(
  'seller/updateSellerStatus',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/update-seller-status`, info, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerReducer = createSlice({
  name: 'seller',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    sellers: [],
    seller: '',
    totalSeller: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSellerRequest.fulfilled, (state, { payload }) => {
        state.sellers = payload.sellers;
        state.totalSeller = payload.totalSeller;
      })

      .addCase(getSeller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
      })

      .addCase(updateSellerStatus.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        state.successMessage = payload.message;
      });
  },
});
export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
