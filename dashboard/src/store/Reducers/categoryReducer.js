import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      const { data } = await api.post('/category-add', formData, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (
    { itemsPerPage, currentPage, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/category-get?currentPage=${currentPage}&&searchValue=${searchValue}&&itemsPerPage=${itemsPerPage}`,
        { withCredentials: true }
      );
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryReducer = createSlice({
  name: 'category',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    categories: [],
    totalCategory: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addCategory.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.categories = [...state.categories, payload.category];
      })

      .addCase(getCategory.fulfilled, (state, { payload }) => {
        state.categories = payload.categories;
        state.totalCategory = payload.totalCategory;
      });
  },
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
