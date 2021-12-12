import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import useApi from '../API/userApi'

export const getUserList = createAsyncThunk(
  'user/getList',
  async (tokens, thunkAPI) => {
    try {
      const response = await useApi.getUserList(tokens)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addUser = createAsyncThunk(
  'user/addUser',
  async (params, thunkAPI) => {
    try {
      const response = await useApi.addUser(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateActiveUser = createAsyncThunk(
  'user/updateActive',
  async (params, thunkAPI) => {
    try {
      const response = await useApi.updateActive(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const user = createSlice({
  name: 'user',
  initialState: {
    data: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getUserList.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    },
    [getUserList.pending]: state => {
      state.loading = true
    },
    [getUserList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [addUser.fulfilled]: (state, action) => {
      state.loading = false
    },
    [addUser.pending]: state => {
      state.loading = true
    },
    [addUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const userReducer = user.reducer
export default userReducer
