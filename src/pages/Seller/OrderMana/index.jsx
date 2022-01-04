import {
  Table,
  Popconfirm,
  Row,
  Input,
  Button,
  Drawer,
  Form,
  Spin,
  notification
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  getOrderManaList,
  deleteOrderMana,
  addBillPaymentMana,
  getOrderDetailMana,
  orderManaConfirm
} from '../../../redux/orderMana.slice'

function OrderMana() {
  const dispatch = useDispatch()
  const orderList = useSelector(state => state.orderMana)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [orderSelected, setOrderSelected] = useState()

  useEffect(() => {
    dispatch(getOrderManaList({ tokens: userInfo.token, user_id: userInfo.id }))
  }, [])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { Search } = Input

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

  async function handleShowOrder(id) {
    const res = await dispatch(
      getOrderDetailMana({ tokens: userInfo.token, id })
    )

    await setOrderSelected(res.payload)
    setIsModalVisible(true)
  }

  async function handleSubmitCode(values) {
    setIsModalVisible(false)
    if (orderSelected?.code_bill_oder) {
      const resConfirm = await dispatch(
        orderManaConfirm({ id: orderSelected?.id, tokens: userInfo.token })
      )

      notification.success({ message: resConfirm.payload.msg })
    } else {
      let formData = new FormData()
      formData.append('code_bill_oder', values.code_bill_oder)
      const res = await dispatch(
        addBillPaymentMana({
          tokens: userInfo.token,
          id: orderSelected?.id,
          body: formData
        })
      )

      const resConfirm = await dispatch(
        orderManaConfirm({ id: orderSelected?.id, tokens: userInfo.token })
      )

      notification.success({ message: resConfirm.payload.msg })
    }
  }

  const handleDeleteOrder = async id => {
    await dispatch(
      deleteOrderMana({
        tokens: userInfo.token,
        id
      })
    )
    await dispatch(
      getOrderManaList({ tokens: userInfo.token, user_id: userInfo.id })
    )
  }

  const dataSource = orderList?.data?.map(item => {
    return {
      ...item,
      key: item.id
    }
  })

  return (
    <main className="user-page">
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
            <Row justify="space-around" align="middle">
              <Button type="primary" size="large" htmlType="submit">
                Xác nhận
              </Button>
              <Button size="large" onClick={() => setIsModalVisible(false)}>
                Huỷ
              </Button>
            </Row>
          </Form>
        ) : (
          <Spin />
        )}
      </Drawer>
      <p className="user-page__title">Quản lý bài viết</p>
      <div className="user-page__main">
        <Row justify="space-between" className="user-page__main--top">
          <div></div>
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
          loading={orderList?.loading}
          columns={tableColumns}
          size="middle"
          pagination={{ defaultPageSize: 9 }}
        />
      </div>
    </main>
  )
}

export default OrderMana
