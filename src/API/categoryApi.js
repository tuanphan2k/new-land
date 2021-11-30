import axiosClient from './axiosClient'

const categoryApi = {
  getCategoryList: data => {
    const url = `/category`
    return axiosClient.get(url)
  }
}

export default categoryApi
