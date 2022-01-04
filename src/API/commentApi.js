import axiosClient from './axiosClient'

const commentApi = {
  getCommentList: product_id => {
    const url = `/comment/${product_id}`
    return axiosClient.get(url)
  },

  addComment: params => {
    const url = `/comment`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  deleteComment: params => {
    const url = `/comment/${params.id}`
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  }
}

export default commentApi
