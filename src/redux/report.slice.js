import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import reportApi from '../API/reportApi'

export const getDataSeller = createAsyncThunk(
  'report/getDataSeller',
  async (params, thunkAPI) => {
    try {
      const response = await reportApi.getDataSeller(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getDataAdmin = createAsyncThunk(
  'report/getDataAdmin',
  async (params, thunkAPI) => {
    try {
      const response = await reportApi.getDataAdmin(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const postTimeSeller = createAsyncThunk(
  'report/postTimeSeller',
  async (params, thunkAPI) => {
    try {
      const response = await reportApi.postTimeSeller(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const postTimeAdmin = createAsyncThunk(
  'report/postTimeAdmin',
  async (params, thunkAPI) => {
    try {
      const response = await reportApi.postTimeAdmin(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const reportMana = createSlice({
  name: 'report',
  initialState: {
    data: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getDataSeller.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload[0]
      state.error = ''
    },
    [getDataSeller.pending]: state => {
      state.loading = true
    },
    [getDataSeller.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [getDataAdmin.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload[0]
      state.error = ''
    },
    [getDataAdmin.pending]: state => {
      state.loading = true
    },
    [getDataAdmin.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [postTimeSeller.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload[0]
      state.error = ''
    },
    [postTimeSeller.pending]: state => {
      state.loading = true
    },
    [postTimeSeller.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [postTimeAdmin.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload[0]
      state.error = ''
    },
    [postTimeAdmin.pending]: state => {
      state.loading = true
    },
    [postTimeAdmin.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const reportManaReducer = reportMana.reducer
export default reportManaReducer
