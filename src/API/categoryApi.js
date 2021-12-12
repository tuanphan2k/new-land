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
  editCategory: categoryId => {
    const url = `/category/${categoryId}`
    return axiosClient.delete(url)
  },
  addCategory: params => {
    const url = `/category`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.token}`,
        'content-type': 'multipart/form-data'
      }
    })
  }
}

export default categoryApi
