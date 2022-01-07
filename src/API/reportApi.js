import axiosClient from './axiosClient'

const orderManaApi = {
  getDataSeller: params => {
    const url = `/statistical`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  getDataAdmin: params => {
    const url = `/statistical/all`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  postTimeSeller: params => {
    const url = `/statistical`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  postTimeAdmin: params => {
    const url = `/statistical/all`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  }
}

export default orderManaApi
