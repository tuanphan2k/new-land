import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderApi from '../API/orderApi'

export const getOrderList = createAsyncThunk(
  'order/getList',
  async (params, thunkAPI) => {
    try {
      const response = await orderApi.getOrderList(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async (params, thunkAPI) => {
    try {
      const response = await orderApi.addOrder(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async (params, thunkAPI) => {
    try {
      const response = await orderApi.deleteOrder(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getOrderDetail = createAsyncThunk(
  'order/getOrderDetail',
  async (params, thunkAPI) => {
    try {
      const response = await orderApi.getOrderDetail(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addBillPayment = createAsyncThunk(
  'order/addBillPayment',
  async (params, thunkAPI) => {
    try {
      const response = await orderApi.addBillPayment(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addBillPaymentProduct = createAsyncThunk(
  'order/addBillPaymentProduct',
  async (params, thunkAPI) => {
    try {
      const response = await orderApi.addBillPaymentProduct(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const order = createSlice({
  name: 'order',
  initialState: {
    data: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getOrderList.fulfilled]: (state, action) => {
      if (action.payload?.length > 0) {
        state.data = action.payload
      } else {
        state.data = []
      }
      state.loading = false
      state.error = ''
    },
    [getOrderList.pending]: state => {
      state.loading = true
    },
    [getOrderList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [addOrder.fulfilled]: (state, action) => {
      state.loading = false
    },
    [addOrder.pending]: (state, action) => {
      state.loading = true
    },
    [addOrder.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.loading = false
    },
    [deleteOrder.pending]: state => {
      state.loading = true
    },
    [deleteOrder.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const orderReducer = order.reducer
export default orderReducer
