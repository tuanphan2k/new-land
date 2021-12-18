import {
  Table,
  Modal,
  Popconfirm,
  Form,
  Row,
  Input,
  Button,
  notification
} from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  getCategoryList,
  addCategory,
  deleteCategory,
  editCategory
} from '../../../redux/category.slice'

import axios from 'axios'

function UserPage() {
  const dispatch = useDispatch()
  const categoryList = useSelector(state => state.category)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [urlImage, setUrlImage] = useState('')

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
                setUrlImage(record.img)
              }}
            />
            <Popconfirm
              title={`Bạn các chắc muốn xoá danh mục này ?`}
              onConfirm={() => handleDeleteCategory(record.id)}
            >
              <DeleteOutlined className="table-icon icon-danger" />
            </Popconfirm>
            <div></div>
          </Row>
        )
      }
    }
  ]

  const handleDeleteCategory = async id => {
    await dispatch(
      deleteCategory({
        token: userInfo.token,
        id
      })
    )
    await dispatch(getCategoryList())
  }

  const dataSource = categoryList.data?.map(item => {
    return {
      ...item,
      key: item.id
    }
  })

  async function handleSubmitCategory() {
    const values = categoryItemForm.getFieldValue()
    delete values?.img
    if (isAddCategory) {
      setIsModalVisible(false)
      await dispatch(
        addCategory({
          token: userInfo.token,
          body: { ...values, image: urlImage }
        })
      )
    } else {
      setIsModalVisible(false)
      await dispatch(
        editCategory({
          token: userInfo.token,
          categoryId: categoryDetail?.id,
          body: { ...values, image: urlImage }
        })
      )
    }

    setcategoryDetail('')
    await dispatch(getCategoryList())
  }

  function handleChangeUpload(file) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'x31ok4ih')

    axios
      .post('https://api.cloudinary.com/v1_1/dkimwmu70/image/upload', formData)
      .then(response => {
        setUrlImage(response.data.secure_url)
        notification.success({
          message: 'Thêm ảnh thành công'
        })
      })
  }

  return (
    <main className="user-page">
      <Modal
        title={isAddCategory ? 'Thêm danh mục' : 'Chỉnh sửa danh mục'}
        visible={isModalVisible}
        onOk={() => handleSubmitCategory()}
        onCancel={() => {
          setUrlImage('')
          setIsModalVisible(false)
        }}
        cancelText="Huỷ"
      >
        <Form
          initialValues={categoryDetail}
          form={categoryItemForm}
          name="categoryItemForm"
          encType="multipart/form-data"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng thêm tên danh mục!'
              }
            ]}
          >
            <Input
              placeholder="Nhập vào tên danh mục"
              value={categoryDetail.email}
            />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <Row justify="space-between" align="middle">
              {isAddCategory ? (
                <>
                  <div></div>
                  <img
                    style={{ width: '100px' }}
                    src={
                      urlImage ||
                      'https://lh3.googleusercontent.com/proxy/H7eJ1vq1S5fgbXGzChzzVkZ9VbfQCFQ1mst-4Xba0yZUt_3VZgQaM0O_nU3n-f7kdNeq7qyNjQhKivTgfNumK-Y0njG-0nPItyMNkbiEGRUB-cmsHBXBd09NEWb6'
                    }
                    alt=""
                  />
                  <span class="btn btn-primary btn-file">
                    Chọn ảnh
                    <input
                      onChange={e => handleChangeUpload(e.target.files[0])}
                      type="file"
                    ></input>
                  </span>
                </>
              ) : (
                <>
                  <div></div>
                  <img
                    style={{ width: '100px' }}
                    src={urlImage || categoryDetail?.img}
                    alt=""
                  />
                  <span class="btn btn-primary btn-file">
                    Chỉnh sửa
                    <input
                      onChange={e => handleChangeUpload(e.target.files[0])}
                      type="file"
                    ></input>
                  </span>
                </>
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
