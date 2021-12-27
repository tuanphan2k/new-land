import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productDetailApi from '../API/productDetailApi'

export const addInfo = createAsyncThunk(
  'productDetail/post',
  async (params, thunkAPI) => {
    try {
      const response = await productDetailApi.addInfo(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addImage = createAsyncThunk(
  'productDetail/post',
  async (params, thunkAPI) => {
    try {
      const response = await productDetailApi.addImage(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getImage = createAsyncThunk(
  'productDetail/getList',
  async (params, thunkAPI) => {
    try {
      const response = await productDetailApi.getImage(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getInfo = createAsyncThunk(
  'productDetail/getList',
  async (params, thunkAPI) => {
    try {
      const response = await productDetailApi.getInfo(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getProductDetail = createAsyncThunk(
  'productDetail/detail',
  async (params, thunkAPI) => {
    try {
      const response = await productDetailApi.getProductDetail(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const productDetail = createSlice({
  name: 'productDetail',
  initialState: {
    data: {},
    loading: false,
    error: ''
  },
  extraReducers: {
    [getProductDetail.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    },
    [getProductDetail.pending]: state => {
      state.loading = true
    },
    [getProductDetail.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const productDetailReducer = productDetail.reducer
export default productDetailReducer
