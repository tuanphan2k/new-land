import { Table, Popconfirm, Row, Input, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  getOrderManaList,
  deleteOrderMana
} from '../../../redux/orderMana.slice'

function OrderMana() {
  const dispatch = useDispatch()
  const orderList = useSelector(state => state.orderMana)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    dispatch(getOrderManaList({ tokens: userInfo.token, user_id: userInfo.id }))
  }, [])

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
        return <img width={100} src={record.img} alt="" />
      }
    },
    {
      title: 'Tên BĐS',
      dataIndex: 'name',
      key: 'name'
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
            <EditOutlined className="table-icon icon-primary" />
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
