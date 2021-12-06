import { Table, Modal, Popconfirm, Form, Row, Input, Button } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCategoryList, addCategory } from '../../../redux/category.slice'

function UserPage() {
  const dispatch = useDispatch()
  const categoryList = useSelector(state => state.category)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [imgUpload, setImgUpload] = useState()
  console.log(imgUpload)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [categoryDetail, setcategoryDetail] = useState({})
  const [filter, setFilter] = useState({})
  const [isAddCategory, setIsAddCategory] = useState(false)

  const [categoryItemForm] = Form.useForm()

  useEffect(() => {
    dispatch(getCategoryList())
  }, [dispatch])

  useEffect(() => {
    categoryItemForm.resetFields()
  }, [categoryDetail.id])

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
      title: 'Tên danh mục',
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
              onClick={() => {
                setIsAddCategory(false)
                setIsModalVisible(true)
                setcategoryDetail({
                  img: record.image,
                  name: record.name,
                  id: record.id
                })
              }}
            />
            <Popconfirm
              title={`Bạn các chắc muốn xoá danh mục này ?`}
              onConfirm={() => {
                dispatch()
                // editUserAction({ userId: record.id, role: 'disable' })
              }}
            >
              <DeleteOutlined className="table-icon icon-danger" />
            </Popconfirm>
            <div></div>
          </Row>
        )
      }
    }
  ]

  const dataSource = categoryList.data?.map(item => {
    return {
      ...item,
      image: `https://api.newhome.tk${item.image}`,
      key: item.id
    }
  })

  function handleSubmitCategory() {
    const values = categoryItemForm.getFieldValue()
    if (isAddCategory) {
      dispatch(
        addCategory({
          token: userInfo.token,
          body: { ...values, image: imgUpload }
        })
      )
    }
    // dispatch(editUserAction({ userId: values.id, role: values.role }))
    setIsModalVisible(false)
  }

  function handleChangeUpload(e) {
    if (e.target.files[0]) {
      setImgUpload(e.target.files[0])
    }
  }

  return (
    <main className="user-page">
      <Modal
        title={isAddCategory ? 'Thêm danh mục' : 'Chỉnh sửa danh mục'}
        visible={isModalVisible}
        onOk={() => handleSubmitCategory()}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          initialValues={categoryDetail}
          form={categoryItemForm}
          name="categoryItemForm"
          encType="multipart/form-data"
        >
          <Form.Item label="Tên" name="name">
            <Input
              placeholder="Nhập vào tên danh mục"
              value={categoryDetail.email}
            />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            <Row justify="center">
              {isAddCategory ? (
                <Input type="file" onChange={e => handleChangeUpload(e)} />
              ) : (
                <img src={categoryDetail.img} alt="" />
              )}
            </Row>
          </Form.Item>
        </Form>
      </Modal>
      <p className="user-page__title">Quản lý danh mục</p>
      <div className="user-page__main">
        <Row justify="space-between" className="user-page__main--top">
          <Button
            type="primary"
            onClick={() => {
              setcategoryDetail({})
              setIsAddCategory(true)
              setIsModalVisible(true)
            }}
          >
            Thêm danh mục
          </Button>
          <Search
            placeholder="input search text"
            allowClear
            className="user-page__main--search"
            enterButton="Search"
            size="large"
            onSearch={value => setFilter({ ...filter, q: value })}
          />
          <div></div>
        </Row>
        <Table
          dataSource={dataSource}
          loading={categoryList.loading}
          columns={tableColumns}
          size="middle"
          pagination={{ defaultPageSize: 9 }}
        />
      </div>
    </main>
  )
}

export default UserPage
