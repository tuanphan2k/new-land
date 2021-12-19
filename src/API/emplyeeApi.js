import axiosClient from './axiosClient'

const employeeApi = {
  getEmployeeList: params => {
    const url = `/employees/get/${params.user_id}`
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  addEmployee: params => {
    const url = `/employees`
    return axiosClient.post(url, params.body, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  editEmployee: (params, data) => {
    const url = `/employees/${params.id}`
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  },

  deleteEmployee: params => {
    const url = `/employees/${params.id}`
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${params.tokens}`
      }
    })
  }
}

export default employeeApi
