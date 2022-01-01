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
  }
}

export default orderManaApi
