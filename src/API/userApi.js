import axiosClient from './axiosClients'

const userApi = {
  getUserList: params => {
    const url = `/users`
    return axiosClient.get(
      url,
      { ...params.filter },
      {
        headers: {
          Authorization: `Bearer ${params.token}`
        }
      }
    )
  },

  editUser: (params, data) => {
    const url = `/users/${params.id}`
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
  }
}

export default userApi
