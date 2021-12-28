import axiosClient from './axiosClient'

const newsApi = {
  addNews: params => {
    const url = `/news`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  getNewsList: () => {
    const url = `/news`
    return axiosClient.get(url)
  },

  getNewsDetail: newsId => {
    const url = `/news/${newsId}`
    return axiosClient.get(url)
  },

  deleteNews: params => {
    const url = `/news/${params.id}`
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${params.token}`
      }
    })
  },

  getNewsListByUserID: params => {
    const url = `/news/user/${params.user_id}`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  editNews: params => {
    const url = `/news/${params.id}`
    return axiosClient.patch(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  }
}

export default newsApi
