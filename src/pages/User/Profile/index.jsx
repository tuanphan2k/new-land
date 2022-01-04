import {
  Form,
  Tabs,
  Button,
  Row,
  Input,
  Radio,
  Avatar,
  notification,
  Table,
  Popconfirm,
  Drawer,
  Spin
} from 'antd'
import {
  UserOutlined,
  LockOutlined,
  SolutionOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { REGEX } from '../../../constants/validate'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  getOrderList,
  deleteOrder,
  getOrderDetail,
  addBillPayment
} from '../../../redux/order.slice'
import './style.scss'

function Profile() {
  const { TabPane } = Tabs
  const dispatch = useDispatch()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const orderList = useSelector(state => state.order)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [orderSelected, setOrderSelected] = useState()

  useEffect(() => {
    dispatch(getOrderList({ tokens: userInfo.token, user_id: userInfo.id }))
  }, [])

  const onFinish = values => {}

  const handleChangePassword = values => {}

  const dataSource = orderList.data?.map(item => ({ ...item, key: item.id }))

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => {
        return <img width={100} src={record.image} alt="" />
      }
    },
    {
      title: 'Tên BĐS',
      dataIndex: 'name_product',
      key: 'name_product'
    },
    {
      title: 'Thời gian hết hạn',
      dataIndex: 'end_time',
      key: 'end_time'
    },
    {
      title: 'Trạng thái đặt cọc',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return <p className="mx-2">{record.status}</p>
      }
    },
    {
      title: 'Tuỳ chỉnh',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Row justify="space-between">
            <EditOutlined
              className="table-icon icon-primary"
              onClick={() => handleShowOrder(record.id)}
            />
            <Popconfirm
              title={`Bạn các chắc huỷ đặt cọc này ?`}
              onConfirm={() => handleDeleteOrder(record.id)}
            >
              <DeleteOutlined className="table-icon icon-danger" />
            </Popconfirm>
          </Row>
        )
      }
    }
  ]

  async function handleDeleteOrder(id) {
    const res = await dispatch(deleteOrder({ id, tokens: userInfo.token }))
    await notification.success({ message: res.payload.msg })
    await dispatch(
      getOrderList({ tokens: userInfo.token, user_id: userInfo.id })
    )
  }

  async function handleSubmitCode(values) {
    setIsModalVisible(false)
    let formData = new FormData()
    formData.append('code_bill_oder', values.code_bill_oder)
    const res = await dispatch(
      addBillPayment({
        tokens: userInfo.token,
        id: orderSelected?.id,
        body: formData
      })
    )

    await notification.success({ message: res.payload.msg })
  }

  async function handleShowOrder(id) {
    const res = await dispatch(getOrderDetail({ tokens: userInfo.token, id }))
    await setOrderSelected(res.payload)
    setIsModalVisible(true)
  }

  return (
    <main className="container-1 profile-page">
      <Drawer
        title="Gửi hoá đơn đặt cọc"
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        width={400}
      >
        {orderSelected?.name_product ? (
          <Form
            initialValues={orderSelected}
            onFinish={values => handleSubmitCode(values)}
          >
            <Form.Item
              name="code_bill_oder"
              label="Mã hoá đơn"
              rules={[{ required: true, message: 'Nhập mã hoá đơn!' }]}
            >
              <Input
                disabled={orderSelected?.name_product ? true : false}
                placeholder="Mã hoá đơn thanh toán"
              />
            </Form.Item>
            <Row justify="center" align="middle">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                disabled={orderSelected?.name_product ? true : false}
              >
                Hoàn tất
              </Button>
            </Row>
          </Form>
        ) : (
          <Spin />
        )}
      </Drawer>
      <div className="profile-page__form">
        <Tabs tabPosition="left" defaultActiveKey="3">
          <TabPane
            tab={
              <span>
                <UserOutlined />
                Thông tin tài khoản
              </span>
            }
            key="1"
          >
            <Form
              name="infor-form"
              className="infor__form"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              initialValues={{
                name: userInfo.name,
                gender: userInfo.gender || '',
                phone: userInfo.phone || '',
                nickName: userInfo.nickName || ''
              }}
              onFinish={onFinish}
            >
              <p className="infor__form--title title">Thông tin tài khoản</p>
              <div className="infor__avatar">
                <div className="infor__avatar--img">
                  <Row justify="center">
                    <Avatar
                      size={86}
                      src="https://joeschmoe.io/api/v1/random"
                    />
                  </Row>
                </div>
                <p className="infor__avatar--name">{`Hi ${userInfo.name}`}</p>
              </div>
              <Form.Item
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!'
                  },
                  () => ({
                    validator(_, value) {
                      if (!value || value.match(REGEX.EMAIL_REGEX)) {
                        return Promise.resolve()
                      }

                      return Promise.reject(
                        new Error('The input is not valid E-mail!')
                      )
                    }
                  })
                ]}
              >
                <Input
                  placeholder="Email address"
                  disabled
                  value={userInfo.email}
                />
              </Form.Item>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  { required: true, message: 'Please input your Full Name!' }
                ]}
              >
                <Input placeholder="Full Name" />
              </Form.Item>
              <Form.Item
                name="phone_number"
                label="Phone number"
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value || value.match(REGEX.PHONE_NUMBER_REGEX)) {
                        return Promise.resolve()
                      }

                      return Promise.reject(
                        new Error('The input is not valid Phone number!')
                      )
                    }
                  })
                ]}
              >
                <Input placeholder="Add phone number" />
              </Form.Item>
              <Form.Item name="nickName" label="Nick Name">
                <Input placeholder="Add nick Name" />
              </Form.Item>
              <Form.Item name="gender" label="Gender">
                <Radio.Group>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="orther">Other</Radio>
                </Radio.Group>
              </Form.Item>
              <Row justify="center">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="my-1"
                    size="large"
                  >
                    Lưu thay đổi
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </TabPane>
          <TabPane
            tab={
              <span>
                <LockOutlined />
                Thay đổi mật khẩu
              </span>
            }
            key="2"
          >
            <Form
              className="change-pass__form"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              onFinish={handleChangePassword}
            >
              <p className="change-pass__form--title title ">Đổi mật khẩu</p>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input new password!'
                  }
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Re-type"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm new password!'
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(
                        new Error(
                          'The two passwords that you entered do not match!'
                        )
                      )
                    }
                  })
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
              <Row justify="center">
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="my-1"
                    size="large"
                  >
                    Save Change
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </TabPane>
          {userInfo?.account_type == 1 ? (
            <TabPane
              tab={
                <span>
                  <SolutionOutlined />
                  Quản lý đặt cọc
                </span>
              }
              key="3"
            >
              <p className="title">Đặt cọc</p>
              <Table
                dataSource={dataSource}
                loading={orderList.load}
                columns={tableColumns}
                size="middle"
                pagination={{ defaultPageSize: 8 }}
              />
            </TabPane>
          ) : (
            ''
          )}
        </Tabs>
      </div>
    </main>
  )
}

export default Profile
