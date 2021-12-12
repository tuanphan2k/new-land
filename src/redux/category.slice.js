import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoryApi from '../API/categoryApi'

export const getCategoryList = createAsyncThunk(
  'category/getList',
  async (data, thunkAPI) => {
    try {
      const response = await categoryApi.getCategoryList()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (params, thunkAPI) => {
    try {
      const response = await categoryApi.addCategory(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'category/addCategory',
  async (params, thunkAPI) => {
    try {
      const response = await categoryApi.deleteCategory(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const category = createSlice({
  name: 'category',
  initialState: {
    data: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getCategoryList.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    },
    [getCategoryList.pending]: state => {
      state.loading = true
    },
    [getCategoryList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [addCategory.fulfilled]: (state, action) => {
      state.loading = false
    },
    [addCategory.pending]: state => {
      state.loading = true
    },
    [addCategory.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.loading = false
    },
    [deleteCategory.pending]: state => {
      state.loading = true
    },
    [deleteCategory.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const categoryReducer = category.reducer
export default categoryReducer
