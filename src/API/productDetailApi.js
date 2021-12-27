import axiosClient from './axiosClient'

const productDetailApi = {
  addImage: params => {
    const url = `/product/image`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  addInfo: params => {
    const url = `/product/information`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  getImage: params => {
    const url = `/product/image/get/${params.id}`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  getInfo: params => {
    const url = `/product/information/get/${params.id}`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  getProductDetail: id => {
    const url = `/product/${id}`
    return axiosClient.get(url)
  }
}

export default productDetailApi
