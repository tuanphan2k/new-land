import { Table, Popconfirm, Row, Input, Button, notification } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { deleteProduct, getProductList } from '../../../redux/product.slice'

function ProductPage() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.product)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    dispatch(getProductList({ tokens: userInfo.token, user_id: userInfo.id }))
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
        return (
          <img
            src={record.image}
            className="category-page__img"
            alt=""
            style={{ maxWidth: '40px' }}
          />
        )
      }
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
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
              // onClick={() => {
              //   setIsAddCategory(false)
              //   setIsModalVisible(true)
              //   setcategoryDetail({
              //     img: record.image,
              //     name: record.name,
              //     id: record.id
              //   })
              //   setUrlImage(record.img)
              // }}
            />
            <Popconfirm
              title={`Bạn các chắc muốn xoá danh mục này ?`}
              onConfirm={() => handleDeleteProduct(record.id)}
            >
              <DeleteOutlined className="table-icon icon-danger" />
            </Popconfirm>
            <div></div>
          </Row>
        )
      }
    }
  ]

  const handleDeleteProduct = async id => {
    await dispatch(
      deleteProduct({
        token: userInfo.token,
        id
      })
    )
    await dispatch(
      getProductList({ tokens: userInfo.token, user_id: userInfo.id })
    )
  }

  const dataSource = productList?.data?.map(item => {
    return {
      ...item,
      key: item.id
    }
  })

  return (
    <main className="user-page">
      <p className="user-page__title">Quản lý danh mục</p>
      <div className="user-page__main">
        <Row justify="space-between" className="user-page__main--top">
          <Button type="primary" onClick={() => {}}>
            Thêm danh mục
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
          loading={productList?.loading}
          columns={tableColumns}
          size="middle"
          pagination={{ defaultPageSize: 9 }}
        />
      </div>
    </main>
  )
}

export default ProductPage
