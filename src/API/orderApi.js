import axiosClient from './axiosClient'

const orderApi = {
  getOrderList: params => {
    const url = `/oder/get/${params.user_id}`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  addOrder: params => {
    const url = `/oder`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  getOrderDetail: params => {
    const url = `/oder/${params.id}`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  deleteOrder: params => {
    const url = `/oder/${params.id}`
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  addBillPayment: params => {
    const url = `/oder/code-bill/${params.id}`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  addBillPaymentProduct: params => {
    const url = `/oder/code-bill-payment/${params.id}`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  }
}

export default orderApi
