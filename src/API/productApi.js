import axiosClient from './axiosClient'

const productApi = {
  addProduct: params => {
    const url = `/product`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },
  getProductList: params => {
    const url = `/product/get/${params.user_id}`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  deleteProduct: params => {
    const url = `/product/${params.id}`
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
  }
}

export default productApi
