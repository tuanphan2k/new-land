import axiosClient from './axiosClient'

const categoryApi = {
  getCategoryList: () => {
    const url = `/category`
    return axiosClient.get(url)
  },
  deleteCategory: categoryId => {
    const url = `/category/${categoryId}`
    return axiosClient.delete(url)
  },
  editCategory: categoryId => {
    const url = `/category/${categoryId}`
    return axiosClient.delete(url)
  },
  addCategory: params => {
    console.log(params)
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
