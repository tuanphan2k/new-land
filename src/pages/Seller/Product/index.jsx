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
  Image,
  Modal,
  Select,
  InputNumber,
  Spin
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
import {
  deleteProduct,
  getProductList,
  editProduct
} from '../../../redux/product.slice'
import { getEmployeeList } from '../../../redux/employee.slice'
import {
  getImage,
  getInfo,
  addImage,
  addInfo,
  getProductDetail
} from '../../../redux/productDetail.slice'
import history from '../../../utils/history'

function ProductPage() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.product)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [productSeleted, setProductSeleted] = useState({})
  const [imageUrl, setImageUrl] = useState([])

  const [visible, setVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const productDetail = useSelector(state => state.productDetail)
  const employeeList = useSelector(state => state.employee)

  const { TextArea } = Input
  useEffect(() => {
    dispatch(getProductList({ tokens: userInfo.token, user_id: userInfo.id }))
    dispatch(
      getEmployeeList({
        tokens: userInfo.token,
        user_id: userInfo.id
      })
    )
  }, [])

  const { Search } = Input
  const [detailForm] = Form.useForm()
  useEffect(() => {
    async function resetData() {
      await dispatch(getProductDetail(productSeleted?.id))
      await detailForm.resetFields()
    }
    resetData()
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
              onClick={() => {
                setIsModalVisible(true)
                setProductSeleted({ ...productSeleted, id: record.id })
              }}
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

  function sliceAdress(address) {
    return address?.split('-')[1]
  }

  async function handleSubmitEdit() {
    try {
      await dispatch(
        editProduct({
          tokens: userInfo.token,
          body: detailForm.getFieldsValue(),
          id: productSeleted?.id
        })
      )
      notification.success({
        message: 'Chỉnh sửa thành công'
      })
    } catch (err) {
      notification.warning({
        message: 'Thêm thất bại'
      })
    }

    await dispatch(
      getProductList({ tokens: userInfo.token, user_id: userInfo.id })
    )
    setIsModalVisible(false)
  }

  return (
    <main className="user-page">
      <Modal
        title="Chỉnh sửa thông tin bất động sản"
        visible={isModalVisible}
        onOk={() => handleSubmitEdit()}
        onCancel={() => setIsModalVisible(false)}
        width={900}
      >
        {productDetail?.loading ? (
          <Spin />
        ) : (
          <Form
            name="detailForm"
            form={detailForm}
            className="info-form"
            layout="vertical"
            initialValues={productDetail?.data}
          >
            <h2 className="login-title">Nhập thông tin địa chỉ</h2>
            <Form.Item
              label="Nhà / căn hộ của bạn thuộc dự án nào"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập vào tên dự án!'
                }
              ]}
            >
              <Input placeholder="Tên dự án" />
            </Form.Item>
            <Row gutter={46}>
              <Col span={12}>
                <Form.Item
                  label="Tỉnh/ Thành phố"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn Tỉnh / Thành phố!'
                    }
                  ]}
                >
                  <Select disabled placeholder="Chọn Tỉnh / Thành phố">
                    {productDetail?.city?.map(item => (
                      <Select.Option key={item} value={item}>
                        {sliceAdress(item.name)}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Quận / Huyện"
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn Quận / Huyện!'
                    }
                  ]}
                >
                  <Select disabled placeholder="Chọn Tỉnh / Thành phố">
                    {productDetail?.district?.map(item => (
                      <Select.Option key={item} value={item}>
                        {sliceAdress(item.name)}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={46}>
              <Col span={12}>
                <Form.Item
                  label="Phường / Xã"
                  name="ward"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn Phường / Xã!'
                    }
                  ]}
                >
                  <Select disabled placeholder="Chọn Tỉnh / Thành phố">
                    {productDetail?.ward?.map(item => (
                      <Select.Option key={item} value={item}>
                        {sliceAdress(item.name)}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Nhân viên bán"
                  name="employees"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn nhân viên!'
                    }
                  ]}
                >
                  <Select style={{ width: 400 }} placeholder="Chọn nhân viên">
                    {employeeList?.data?.map(item => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.full_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={46}>
              <Col span={12}>
                <Form.Item
                  label="Giá bán mong muốn"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập vào giá bán!'
                    }
                  ]}
                >
                  <InputNumber
                    style={{ width: 300 }}
                    min="0"
                    placeholder="Giá mong muốn"
                    stringMode
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số tiền cần đặt cọc"
                  name="deposit_price"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập vào tiền đặt cọc!'
                    }
                  ]}
                >
                  <InputNumber
                    style={{ width: 300 }}
                    min="0"
                    placeholder="Tiền đặt cọc"
                    stringMode
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={46}>
              <Col span={12}>
                <Form.Item
                  label="Hạn ngày đặt cọc"
                  name="deposit_time"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập vào hạn ngày đặt cọc!'
                    }
                  ]}
                >
                  <InputNumber
                    style={{ width: 200 }}
                    min="1"
                    placeholder="Số lượng"
                    stringMode
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số lượng bất động sản"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập vào số lượng!'
                    }
                  ]}
                >
                  <InputNumber
                    style={{ width: 200 }}
                    min="1"
                    placeholder="Số lượng"
                    stringMode
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Mô tả căn nhà của bạn" name="description">
              <TextArea placeholder="Mô tả" />
            </Form.Item>
          </Form>
        )}
      </Modal>
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
        <Form layout="vertical" name="infoForm" onFinish={onFinish}>
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
