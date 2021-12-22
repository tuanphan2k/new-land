import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productApi from '../API/productApi'

export const postProduct = createAsyncThunk(
  'product/post',
  async (params, thunkAPI) => {
    try {
      const response = await productApi.addProduct(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getProductList = createAsyncThunk(
  'product/getList',
  async (params, thunkAPI) => {
    try {
      const response = await productApi.getProductList(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'employee/deleteProduct',
  async (params, thunkAPI) => {
    try {
      const response = await productApi.deleteProduct(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const product = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getProductList.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    },
    [getProductList.pending]: state => {
      state.loading = true
    },
    [getProductList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [postProduct.fulfilled]: state => {
      state.loading = false
    },
    [postProduct.pending]: state => {
      state.loading = true
    },
    [postProduct.rejected]: state => {
      state.loading = false
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false
    },
    [deleteProduct.pending]: state => {
      state.loading = true
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const productReducer = product.reducer
export default productReducer
