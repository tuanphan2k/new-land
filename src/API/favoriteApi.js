import axiosClient from './axiosClient'

const favoriteApi = {
  getFavoriteList: params => {
    const url = `/favorite`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  addFavorite: params => {
    const url = `/favorite`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  deleteFavorite: params => {
    const url = `/favorite/${params.id}`
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  }
}

export default favoriteApi
