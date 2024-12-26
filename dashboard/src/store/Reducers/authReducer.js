import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

export const adminLogin = createAsyncThunk('auth/admin_login', async (info) => {
  console.log(info);
  try {
    const { data } = await api.post('/admin-login', info, {
      withCredentials: true,
    });
    localStorage.setItem('accessToken', data.token);
    console.log(data);
  } catch (error) {
    console.log(error.response.data);
  }
});

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: '',
  },
  reducers: {},
  extraReducers: () => {},
});
export default authReducer.reducer;
