import { Table, Modal, Form, Row, Input, Button, Drawer, Switch } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUserList, updateActiveUser } from '../../../redux/user.slice'
import RegisterPage from '../../Auth/RegisterPage'

function UserPage() {
  const dispatch = useDispatch()
  const userList = useSelector(state => state.user)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [userDetail, setUserDetail] = useState({})

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const [userItemForm] = Form.useForm()

  useEffect(() => {
    dispatch(getUserList(userInfo.token))
  }, [visibleDrawer])

  useEffect(() => {
    userItemForm.resetFields()
  }, [userDetail.id])

  const { Search } = Input

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Loại tài khoản',
      dataIndex: 'role',
      key: 'role',
      render: (_, record) => {
        if (record.account_type === 0) {
          return <p>Admin</p>
        } else if (record.account_type === 1) {
          return <p>Người mua</p>
        } else if (record.account_type === 2) {
          return <p>Người bán</p>
        }
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        if (record.id === userInfo.id) {
          return <p className="mx-2">Tài khoản của tôi</p>
        } else {
          return (
            <Row justify="space-between">
              <EditOutlined
                className="table-icon icon-primary"
                onClick={() => {
                  setIsModalVisible(true)
                  setUserDetail({ ...record })
                }}
              />
              {record.account_type !== 0 ? (
                <Switch
                  defaultChecked={record.active === 1 ? true : false}
                  onChange={() => handleEditCategory(record.id)}
                />
              ) : (
                ''
              )}
              <div></div>
            </Row>
          )
        }
      }
    }
  ]

  const handleEditCategory = async id => {
    await dispatch(
      updateActiveUser({
        token: userInfo.token,
        id
      })
    )
    await dispatch(getUserList())
  }

  const dataSource = userList.data.map(item => {
    return {
      ...item,
      key: item.id
    }
  })

  function handleEditUser() {
    const values = userItemForm.getFieldValue()
    // dispatch(editUserAction({ userId: values.id, role: values.role }))
    setIsModalVisible(false)
  }

  return (
    <main className="user-page">
      <Modal
        title={`Tài khoản của ${userDetail.name}`}
        visible={isModalVisible}
        onOk={() => handleEditUser()}
        onCancel={() => setIsModalVisible(false)}
        cancelText="Huỷ"
      >
        <Form
          initialValues={userDetail}
          form={userItemForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          name="userItemForm"
        >
          <Form.Item label="Tên">
            <Input
              placeholder="Email address"
              disabled
              value={userDetail.name}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              placeholder="Email address"
              disabled
              value={userDetail.email}
            />
          </Form.Item>
        </Form>
      </Modal>
      <p className="user-page__title">Quản lý tài khoản</p>
      <Drawer
        title="Thêm tài khoản Admin"
        placement="right"
        width="600"
        onClose={() => setVisibleDrawer(false)}
        visible={visibleDrawer}
      >
        <RegisterPage isAdmin={true} setVisibleDrawer={setVisibleDrawer} />
      </Drawer>
      <div className="user-page__main">
        <Row justify="space-between" className="user-page__main--top">
          <Button
            type="primary"
            onClick={() => {
              setVisibleDrawer(true)
            }}
          >
            Thêm tài khoản Admin
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
          loading={userList.load}
          columns={tableColumns}
          size="middle"
          pagination={{ defaultPageSize: 9 }}
        />
      </div>
    </main>
  )
}

export default UserPage
