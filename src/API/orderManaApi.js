import axiosClient from './axiosClient'

const orderManaApi = {
  getOrderManaList: params => {
    const url = `/oder-manager`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  deleteOrderMana: params => {
    const url = `/oder-manager/${params.id}`
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  addBillPayment: params => {
    const url = `/oder/code-manager/${params.id}`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  getOrderDetailMana: params => {
    const url = `/oder-manager/${params.id}`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  orderManaConfirm: params => {
    const url = `/oder-manager/confirm/${params.id}`
    return axiosClient.post(
      url,
      { data: '123' },
      {
        headers: {
          Authorization: `Bearer ${params.tokens}`
        }
      }
    )
  },

  paymentManaConfirm: params => {
    const url = `/oder-manager/confirm-payment/${params.id}`
    return axiosClient.post(
      url,
      { data: '123' },
      {
        headers: {
          Authorization: `Bearer ${params.tokens}`
        }
      }
    )
  }
}

export default orderManaApi
