import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import employeeApi from '../API/emplyeeApi'

export const getEmployeeList = createAsyncThunk(
  'employee/getList',
  async (params, thunkAPI) => {
    try {
      const response = await employeeApi.getEmployeeList(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (params, thunkAPI) => {
    try {
      const response = await employeeApi.addEmployee(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (params, thunkAPI) => {
    try {
      const response = await employeeApi.deleteEmployee(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const employee = createSlice({
  name: 'employee',
  initialState: {
    data: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getEmployeeList.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    },
    [getEmployeeList.pending]: state => {
      state.loading = true
    },
    [getEmployeeList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [addEmployee.fulfilled]: (state, action) => {
      state.loading = false
    },
    [addEmployee.pending]: state => {
      state.loading = true
    },
    [addEmployee.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.loading = false
    },
    [deleteEmployee.pending]: state => {
      state.loading = true
    },
    [deleteEmployee.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const employeeReducer = employee.reducer
export default employeeReducer
