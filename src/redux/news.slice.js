import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import newsApi from '../API/newsApi'

export const getNewsList = createAsyncThunk(
  'news/getList',
  async (data, thunkAPI) => {
    try {
      const response = await newsApi.getNewsList()
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addNews = createAsyncThunk(
  'news/addNews',
  async (params, thunkAPI) => {
    try {
      const response = await newsApi.addNews(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const editNews = createAsyncThunk(
  'news/editNews',
  async (params, thunkAPI) => {
    try {
      const response = await newsApi.editNews(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (params, thunkAPI) => {
    try {
      const response = await newsApi.deleteNews(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getNewsListByUserID = createAsyncThunk(
  'news/getList',
  async (params, thunkAPI) => {
    try {
      const response = await newsApi.getNewsListByUserID(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getNewsDetail = createAsyncThunk(
  'news/getDetail',
  async (newsId, thunkAPI) => {
    try {
      const response = await newsApi.getNewsDetail(newsId)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const news = createSlice({
  name: 'news',
  initialState: {
    data: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getNewsList.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    },
    [getNewsList.pending]: state => {
      state.loading = true
    },
    [getNewsList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [getNewsListByUserID.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    },
    [getNewsListByUserID.pending]: state => {
      state.loading = true
    },
    [getNewsListByUserID.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const newsReducer = news.reducer
export default newsReducer
