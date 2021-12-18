import axiosClient from './axiosClient'

const userApi = {
  getUserList: tokens => {
    const url = `/user`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${tokens}`
      }
    })
  },

  editUser: (params, data) => {
    const url = `/user/${params.id}`
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
  },

  updateActive: params => {
    const url = `/user/active/${params.id}`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
  }
}

export default userApi
