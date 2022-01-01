import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderManaApi from '../API/orderManaApi'

export const getOrderManaList = createAsyncThunk(
  'order-mana/getList',
  async (params, thunkAPI) => {
    try {
      const response = await orderManaApi.getOrderManaList(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteOrderMana = createAsyncThunk(
  'order-mana/deleteOrderMana',
  async (params, thunkAPI) => {
    try {
      const response = await orderManaApi.deleteOrderMana(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const orderMana = createSlice({
  name: 'order-mana',
  initialState: {
    data: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getOrderManaList.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    },
    [getOrderManaList.pending]: state => {
      state.loading = true
    },
    [getOrderManaList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [deleteOrderMana.fulfilled]: (state, action) => {
      state.loading = false
    },
    [deleteOrderMana.pending]: state => {
      state.loading = true
    },
    [deleteOrderMana.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const orderManaReducer = orderMana.reducer
export default orderManaReducer
