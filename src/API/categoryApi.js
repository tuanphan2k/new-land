import axiosClient from './axiosClient'

const categoryApi = {
  getCategoryList: () => {
    const url = `/category`
    return axiosClient.get(url)
  },

  deleteCategory: params => {
    const url = `/category/${params.id}`
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
  },

  editCategory: params => {
    const url = `/category/${params.categoryId}`
    return axiosClient.patch(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
  },

  addCategory: params => {
    const url = `/category`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
  }
}

export default categoryApi
