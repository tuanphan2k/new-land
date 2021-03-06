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
      title: 'H??nh ???nh',
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
      title: 'T??n',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Gi??',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Tu??? ch???nh',
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
              title={`B???n c??c ch???c mu???n xo?? danh m???c n??y ?`}
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
        message: 'Th??m th??ng tin th??nh c??ng'
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
          message: 'Th??m ???nh th??nh c??ng'
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
        message: 'Ch???nh s???a th??nh c??ng'
      })
    } catch (err) {
      notification.warning({
        message: 'Th??m th???t b???i'
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
        title="Ch???nh s???a th??ng tin b???t ?????ng s???n"
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
            <h2 className="login-title">Nh???p th??ng tin ?????a ch???</h2>
            <Form.Item
              label="Nh?? / c??n h??? c???a b???n thu???c d??? ??n n??o"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui l??ng nh???p v??o t??n d??? ??n!'
                }
              ]}
            >
              <Input placeholder="T??n d??? ??n" />
            </Form.Item>
            <Row gutter={46}>
              <Col span={12}>
                <Form.Item
                  label="T???nh/ Th??nh ph???"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng ch???n T???nh / Th??nh ph???!'
                    }
                  ]}
                >
                  <Select disabled placeholder="Ch???n T???nh / Th??nh ph???">
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
                  label="Qu???n / Huy???n"
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng ch???n Qu???n / Huy???n!'
                    }
                  ]}
                >
                  <Select disabled placeholder="Ch???n T???nh / Th??nh ph???">
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
                  label="Ph?????ng / X??"
                  name="ward"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng ch???n Ph?????ng / X??!'
                    }
                  ]}
                >
                  <Select disabled placeholder="Ch???n T???nh / Th??nh ph???">
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
                  label="Nh??n vi??n b??n"
                  name="employees"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng ch???n nh??n vi??n!'
                    }
                  ]}
                >
                  <Select style={{ width: 400 }} placeholder="Ch???n nh??n vi??n">
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
                  label="Gi?? b??n mong mu???n"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng nh???p v??o gi?? b??n!'
                    }
                  ]}
                >
                  <InputNumber
                    style={{ width: 300 }}
                    min="0"
                    placeholder="Gi?? mong mu???n"
                    stringMode
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="S??? ti???n c???n ?????t c???c"
                  name="deposit_price"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng nh???p v??o ti???n ?????t c???c!'
                    }
                  ]}
                >
                  <InputNumber
                    style={{ width: 300 }}
                    min="0"
                    placeholder="Ti???n ?????t c???c"
                    stringMode
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={46}>
              <Col span={12}>
                <Form.Item
                  label="H???n ng??y ?????t c???c"
                  name="deposit_time"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng nh???p v??o h???n ng??y ?????t c???c!'
                    }
                  ]}
                >
                  <InputNumber
                    style={{ width: 200 }}
                    min="1"
                    placeholder="S??? l?????ng"
                    stringMode
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="S??? l?????ng b???t ?????ng s???n"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: 'Vui l??ng nh???p v??o s??? l?????ng!'
                    }
                  ]}
                >
                  <InputNumber
                    style={{ width: 200 }}
                    min="1"
                    placeholder="S??? l?????ng"
                    stringMode
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="M?? t??? c??n nh?? c???a b???n" name="description">
              <TextArea placeholder="M?? t???" />
            </Form.Item>
          </Form>
        )}
      </Modal>
      <Drawer
        title="Th??m th??ng tin chi ti???t"
        width="600"
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <div style={{ marginBottom: '30px' }}>
          <Row>
            <h3>H??nh ???nh:</h3>
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
              Ch???n ???nh
              <input
                onChange={e => handleChangeUpload(e.target.files[0])}
                type="file"
              ></input>
            </span>
          </Row>
        </div>
        <Form layout="vertical" name="infoForm" onFinish={onFinish}>
          <Row>
            <h3>M?? t???:</h3>
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
                            label="Ti??u ?????"
                            name={[field.name, 'title']}
                            fieldKey={[field.fieldKey, 'title']}
                            rules={[
                              { required: true, message: 'Nh???p ti??u ?????!' }
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
                        label="M?? t???"
                        name={[field.name, 'content']}
                        fieldKey={[field.fieldKey, 'content']}
                        rules={[{ required: true, message: 'Nh???p n???i dung' }]}
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
                    Th??m m?? t???
                  </Button>
                </Form.Item>
                <Row justify="center">
                  <Form.Item>
                    <Button type="primary" size="large" htmlType="submit">
                      Ho??n t???t
                    </Button>
                  </Form.Item>
                </Row>
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
      <p className="user-page__title">Qu???n l?? danh m???c</p>
      <div className="user-page__main">
        <Row justify="space-between" className="user-page__main--top">
          <Button type="primary" onClick={() => history.push('/post-product')}>
            Th??m b???t ?????ng s???n
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
