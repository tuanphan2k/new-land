import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authApi from '../../API/authApi'

export const postLogin = createAsyncThunk(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const response = await authApi.login(data)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const postRegister = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const response = await authApi.register(data)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const auth = createSlice({
  name: 'auth',
  initialState: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    loading: false,
    error: ''
  },
  extraReducers: {
    [postLogin.fulfilled]: (state, action) => {
      state.loading = false
      state.userInfo = {
        ...action.payload.user,
        token: action.payload.token
      }
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      state.error = ''
    },
    [postLogin.pending]: state => {
      state.loading = true
    },
    [postLogin.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const authReducer = auth.reducer
export default authReducer
