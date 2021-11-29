import axiosClient from './axiosClient'

const authApi = {
  getTodoList: params => {
    const url = `/location`
    return axiosClient.get(url, { params })
  }
}

export default authApi
