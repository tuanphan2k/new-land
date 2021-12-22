import {
  Progress,
  Select,
  Button,
  Form,
  Input,
  Row,
  Col,
  notification,
  InputNumber
} from 'antd'
import axios from 'axios'
import { DoubleLeftOutlined } from '@ant-design/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getEmployeeList } from '../../../redux/employee.slice'
import { postProduct } from '../../../redux/product.slice'
import history from '../../../utils/history'
import './style.scss'

function PostProduct() {
  const dispatch = useDispatch()
  const [percent, setPercent] = useState(33)
  const [infoPost, setInfoPost] = useState({
    category_id: '',
    city: '',
    district: '',
    ward: ''
  })
  const [countries, setCountries] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const { Option } = Select
  const { TextArea } = Input

  const categoryList = useSelector(state => state.category)
  const employeeList = useSelector(state => state.employee)

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/location`)
      setCountries(await response.json())
    }
    fetchCountryData()

    dispatch(getEmployeeList({ tokens: userInfo.token, user_id: userInfo.id }))
  }, [])

  useEffect(() => {
    if (infoPost.city) {
      const fetchDistrictData = async () => {
        const [code] = infoPost?.city.split('-')
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/location/${code}`
        )
        setDistricts(await response.json())
      }
      fetchDistrictData()
    }
  }, [infoPost?.city])

  useEffect(() => {
    if (infoPost.district) {
      const fetchDistrictData = async () => {
        const [codeCity] = infoPost?.city.split('-')
        const [codeDistrict] = infoPost?.district.split('-')
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/location/${codeCity}/${codeDistrict}`
        )
        setWards(await response.json())
      }
      fetchDistrictData()
    }
  }, [infoPost?.district])

  function handleStart() {
    if (infoPost?.category_id) {
      setPercent(66)
    } else {
      notification.warning({
        message: 'Bạn phải chọn loại bất động sản'
      })
    }
  }

  async function onFinishAddress(value) {
    setPercent(100)
    setInfoPost({ ...infoPost, ...value })
  }

  function handleChangeUpload(file) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'x31ok4ih')

    axios
      .post('https://api.cloudinary.com/v1_1/dkimwmu70/image/upload', formData)
      .then(response => {
        setInfoPost({ ...infoPost, image: response.data.secure_url })
        notification.success({
          message: 'Thêm ảnh thành công'
        })
      })
  }

  async function handleFinalSubmit() {
    try {
      const res = await dispatch(
        postProduct({
          tokens: userInfo.token,
          body: infoPost
        })
      )
      unwrapResult(res)
      notification.success({
        message: res.payload.msg
      })
      history.push('/seller/product')
    } catch (err) {
      notification.warning({
        message: 'Thêm thất bại'
      })
    }
  }

  return (
    <main className="section-post">
      <Progress percent={percent} showInfo={false} />
      <div className="post-product">
        <section
          className={`post-product__category ${
            percent !== 33 ? 'd-none' : null
          }`}
        >
          <div className="post-product__category--content">
            <h2>Bán nhà cùng NewLand</h2>
            <p className="text-question">
              Bạn đang sử dụng bất động sản này ra sao ?
            </p>
            <Select
              showSearch
              defaultValue="jack"
              placeholder="Chọn tình trạng"
              optionFilterProp="children"
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Tôi đang sống tại đây</Option>
              <Option value="lucy">Nhà đang cho thuê</Option>
              <Option value="Yiminghe">Nhà đang bỏ trống</Option>
            </Select>
            <p className="text-question">
              Bạn muốn bán loại hình bất động sản nào ?
            </p>
            <Select
              showSearch
              placeholder="Chọn một trong các mục"
              optionFilterProp="children"
              onChange={value =>
                setInfoPost({ ...infoPost, category_id: value })
              }
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {categoryList?.data.map(item => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
            <div className="btn-start">
              <Button type="primary" onClick={() => handleStart()} size="large">
                Bắt đầu
              </Button>
            </div>
          </div>
        </section>
        <Row
          justify="center"
          align="middle"
          className={`post-product__info ${percent !== 66 ? 'd-none' : null}`}
        >
          <Col span={24}>
            <Form
              name="info-form"
              className="info-form"
              layout="vertical"
              onFinish={value => onFinishAddress(value)}
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
              <Form.Item
                label="Địa chỉ cụ thể"
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ!'
                  }
                ]}
              >
                <Input placeholder="Số nhà, tên toà nhà, tên đường" />
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
                    <Select
                      placeholder="Chọn Tỉnh / Thành phố"
                      onChange={value =>
                        setInfoPost({ ...infoPost, city: value })
                      }
                    >
                      {countries?.map(item => (
                        <Select.Option
                          key={item.code}
                          value={`${item.code}-${item.name}`}
                        >
                          {item.name}
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
                    <Select
                      placeholder="Chọn Tỉnh / Thành phố"
                      onChange={value =>
                        setInfoPost({ ...infoPost, district: value })
                      }
                    >
                      {districts?.map(item => (
                        <Select.Option
                          key={item.code}
                          value={`${item.code}-${item.name}`}
                        >
                          {item.name}
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
                    <Select
                      placeholder="Chọn Phường / Xã"
                      onChange={value =>
                        setInfoPost({ ...infoPost, ward: value })
                      }
                    >
                      {wards?.map(item => (
                        <Select.Option
                          key={item.code}
                          value={`${item.code}-${item.name}`}
                        >
                          {item.name}
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
                      max={infoPost?.price * 0.5}
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
              <Form.Item>
                <Row justify="space-between">
                  <Button
                    icon={<DoubleLeftOutlined />}
                    size="large"
                    onClick={() => setPercent(0)}
                  >
                    Quay lại
                  </Button>
                  <Button type="primary" htmlType="submit" size="large">
                    Tiếp tục
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row
          justify="center"
          align="middle"
          className={`post-product__img ${percent !== 100 ? 'd-none' : null}`}
        >
          {!infoPost?.image ? (
            <div>
              <p className="post-product__img--title">
                Thêm ảnh cho bất động sản
              </p>
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
          ) : (
            <div>
              <Row justify="center">
                <img src={infoPost?.image} alt="" />
              </Row>
              <Row className="btn-img-submit" justify="space-between">
                <Button
                  icon={<DoubleLeftOutlined />}
                  size="large"
                  onClick={() => setPercent(66)}
                >
                  Quay lại
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleFinalSubmit()}
                >
                  Hoàn tất đăng bán
                </Button>
              </Row>
            </div>
          )}
        </Row>
      </div>
    </main>
  )
}

export default PostProduct
