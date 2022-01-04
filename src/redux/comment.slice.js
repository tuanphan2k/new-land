import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import commentApi from '../API/commentApi'

export const getCommentList = createAsyncThunk(
  'comment/getCommentList',
  async (params, thunkAPI) => {
    try {
      const response = await commentApi.getCommentList(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const addComment = createAsyncThunk(
  'comment/addComment',
  async (params, thunkAPI) => {
    try {
      const response = await commentApi.addComment(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (params, thunkAPI) => {
    try {
      const response = await commentApi.deleteComment(params)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const comment = createSlice({
  name: 'comment',
  initialState: {
    data: [],
    loading: false,
    error: ''
  },
  extraReducers: {
    [getCommentList.fulfilled]: (state, action) => {
      if (action.payload?.length > 0) {
        state.data = action.payload
      } else {
        state.data = []
      }
      state.loading = false
      state.error = ''
    },
    [getCommentList.pending]: state => {
      state.loading = true
    },
    [getCommentList.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [addComment.fulfilled]: (state, action) => {
      state.loading = false
    },
    [addComment.pending]: (state, action) => {
      state.loading = true
    },
    [addComment.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.loading = false
    },
    [deleteComment.pending]: state => {
      state.loading = true
    },
    [deleteComment.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error.message
    }
  }
})

const commentReducer = comment.reducer
export default commentReducer
