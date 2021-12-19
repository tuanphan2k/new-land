import { Table, Form, Row, Input, Button, Drawer, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getEmployeeList, deleteEmployee } from '../../../redux/employee.slice'
import FormEmployee from './Form'

function Employee() {
  const dispatch = useDispatch()
  const employeeList = useSelector(state => state.employee)

  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [employeeDetail, setEmployeeDetail] = useState({})

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const [userItemForm] = Form.useForm()

  useEffect(() => {
    dispatch(getEmployeeList({ tokens: userInfo.token, user_id: userInfo.id }))
  }, [visibleDrawer])

  useEffect(() => {
    userItemForm.resetFields()
  }, [employeeDetail.id])

  const { Search } = Input

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Tên',
      dataIndex: 'full_name',
      key: 'full_name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number'
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'bank_account_number',
      key: 'bank_account_number'
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Row justify="space-between">
            <EditOutlined
              className="table-icon icon-primary"
              onClick={() => {
                setEmployeeDetail({ ...record })
              }}
            />
            <Popconfirm
              title={`Bạn các chắc muốn xoá danh mục này ?`}
              onConfirm={() => handleDeleteEmployee(record.id)}
            >
              <DeleteOutlined className="table-icon icon-danger" />
            </Popconfirm>
          </Row>
        )
      }
    }
  ]

  const dataSource = employeeList?.data.map(item => {
    return {
      ...item,
      key: item.id
    }
  })

  async function handleDeleteEmployee(id) {
    await dispatch(deleteEmployee({ tokens: userInfo.token, id }))
    await dispatch(
      getEmployeeList({ tokens: userInfo.token, user_id: userInfo.id })
    )
  }

  return (
    <main className="user-page">
      <p className="user-page__title">Quản lý nhân viên</p>
      <Drawer
        title="Thêm nhân viên"
        placement="right"
        width="600"
        onClose={() => setVisibleDrawer(false)}
        visible={visibleDrawer}
      >
        <FormEmployee />
      </Drawer>
      <div className="user-page__main">
        <Row justify="space-between" className="user-page__main--top">
          <Button
            type="primary"
            onClick={() => {
              setVisibleDrawer(true)
            }}
          >
            Thêm nhân viên
          </Button>
          <Search
            placeholder="input search text"
            allowClear
            className="user-page__main--search"
            enterButton="Search"
            size="large"
          />
          <div></div>
        </Row>
        <Table
          dataSource={dataSource}
          loading={employeeList.loading}
          columns={tableColumns}
          size="middle"
          pagination={{ defaultPageSize: 9 }}
        />
      </div>
    </main>
  )
}

export default Employee
