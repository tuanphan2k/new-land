import {
  Table,
  Popconfirm,
  Row,
  Input,
  Button,
  notification,
  Form,
  Drawer,
  Col,
  Image
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  BorderInnerOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'
import axios from 'axios'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { deleteProduct, getProductList } from '../../../redux/product.slice'
import {
  getImage,
  getInfo,
  addImage,
  addInfo
} from '../../../redux/productDetail.slice'
import history from '../../../utils/history'

function ProductPage() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.product)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [productSeleted, setProductSeleted] = useState({})
  const [imageUrl, setImageUrl] = useState([])

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    dispatch(getProductList({ tokens: userInfo.token, user_id: userInfo.id }))
  }, [])

  const { Search } = Input
  const [infoForm] = Form.useForm()
  useEffect(() => {
    infoForm.resetFields()
  }, [productSeleted.id])

  async function handleAddInfo(id) {
    setVisible(true)
    try {
      const resImage = await dispatch(getImage({ tokens: userInfo.token, id }))
      const resInfo = await dispatch(getInfo({ tokens: userInfo.token, id }))
      setProductSeleted({
        id,
        imageList: resImage?.payload,
        infoList: resInfo.payload
      })
    } catch (err) {
      setProductSeleted({ id })
    }
  }

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
      title: 'Giá',
      dataIndex: 'price',
      key: 'price'
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
            <BorderInnerOutlined
              className="table-icon icon-primary"
              onClick={() => handleAddInfo(record.id)}
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

  const onFinish = values => {
    const formData = new FormData()
    const formDataImg = new FormData()

    formData.append('product_id', productSeleted?.id)
    formDataImg.append('product_id', productSeleted?.id)

    values?.infos?.forEach((item, index) => {
      formData.append(`title[${index}]`, item.title)
      formData.append(`content[${index}]`, item.content)
    })

    imageUrl?.forEach((item, index) => {
      formDataImg.append(`image[${index}]`, item)
    })

    try {
      values?.infos &&
        dispatch(addInfo({ tokens: userInfo.token, body: formData }))
      imageUrl?.[0] &&
        dispatch(addImage({ tokens: userInfo.token, body: formDataImg }))
      notification.success({
        message: 'Thêm thông tin thành công'
      })
    } catch (err) {}
  }

  function handleChangeUpload(file) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'x31ok4ih')

    axios
      .post('https://api.cloudinary.com/v1_1/dkimwmu70/image/upload', formData)
      .then(response => {
        setImageUrl([...imageUrl, response.data.secure_url])
        notification.success({
          message: 'Thêm ảnh thành công'
        })
      })
  }

  return (
    <main className="user-page">
      <Drawer
        title="Thêm thông tin chi tiết"
        width="600"
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <div style={{ marginBottom: '30px' }}>
          <Row>
            <h3>Hình ảnh:</h3>
            <Row gutter={8}>
              {imageUrl.map(item => (
                <Col span={6}>
                  <Image src={item} />
                </Col>
              ))}
            </Row>
          </Row>
          <Row justify="center">
            <span class="btn btn-primary btn-file">
              Chọn ảnh
              <input
                onChange={e => handleChangeUpload(e.target.files[0])}
                type="file"
              ></input>
            </span>
          </Row>
        </div>
        <Form
          initialValues={infoForm}
          form={infoForm}
          layout="vertical"
          name="infoForm"
          onFinish={onFinish}
        >
          <Row>
            <h3>Mô tả:</h3>
          </Row>
          <Form.List name="infos">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Row gutter={8} key={field.key}>
                    <Col span={8}>
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) =>
                          prevValues.infos !== curValues.infos
                        }
                      >
                        {() => (
                          <Form.Item
                            {...field}
                            label="Tiêu đề"
                            name={[field.name, 'title']}
                            fieldKey={[field.fieldKey, 'title']}
                            rules={[
                              { required: true, message: 'Nhập tiêu đề!' }
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...field}
                        label="Mô tả"
                        name={[field.name, 'content']}
                        fieldKey={[field.fieldKey, 'content']}
                        rules={[{ required: true, message: 'Nhập nội dung' }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Row
                        justify="center"
                        align="middle"
                        style={{ height: '100%' }}
                      >
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Row>
                    </Col>
                  </Row>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Thêm mô tả
                  </Button>
                </Form.Item>
                <Row justify="center">
                  <Form.Item>
                    <Button type="primary" size="large" htmlType="submit">
                      Hoàn tất
                    </Button>
                  </Form.Item>
                </Row>
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
      <p className="user-page__title">Quản lý danh mục</p>
      <div className="user-page__main">
        <Row justify="space-between" className="user-page__main--top">
          <Button type="primary" onClick={() => history.push('/post-product')}>
            Thêm bất động sản
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
