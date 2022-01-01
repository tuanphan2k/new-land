import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import favoriteApi from '../API/favoriteApi'

export const getFavoriteList = createAsyncThunk(
  'favorite/getList',
  async (params, thunkAPI) => {
    try {
      const response = await favoriteApi.getFavoriteList(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addFavorite = createAsyncThunk(
  'favorite/addFavorite',
  async (params, thunkAPI) => {
    try {
      const response = await favoriteApi.addFavorite(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteFavorite = createAsyncThunk(
  'favorite/deleteFavorite',
  async (params, thunkAPI) => {
    try {
      const response = await favoriteApi.deleteFavorite(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const favorite = createSlice({
  name: 'favorite',
  initialState: {
    data: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getFavoriteList.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    },
    [getFavoriteList.pending]: state => {
      state.loading = true
    },
    [getFavoriteList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [addFavorite.fulfilled]: (state, action) => {
      state.loading = false
    },
    [addFavorite.pending]: (state, action) => {
      state.loading = true
    },
    [addFavorite.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [deleteFavorite.fulfilled]: (state, action) => {
      state.loading = false
    },
    [deleteFavorite.pending]: state => {
      state.loading = true
    },
    [deleteFavorite.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const favoriteReducer = favorite.reducer
export default favoriteReducer
