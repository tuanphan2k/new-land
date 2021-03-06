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
        message: 'B???n ph???i ch???n lo???i b???t ?????ng s???n'
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
          message: 'Th??m ???nh th??nh c??ng'
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
        message: 'Th??m th???t b???i'
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
            <h2>B??n nh?? c??ng NewLand</h2>
            <p className="text-question">
              B???n ??ang s??? d???ng b???t ?????ng s???n n??y ra sao ?
            </p>
            <Select
              showSearch
              defaultValue="jack"
              placeholder="Ch???n t??nh tr???ng"
              optionFilterProp="children"
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">T??i ??ang s???ng t???i ????y</Option>
              <Option value="lucy">Nh?? ??ang cho thu??</Option>
              <Option value="Yiminghe">Nh?? ??ang b??? tr???ng</Option>
            </Select>
            <p className="text-question">
              B???n mu???n b??n lo???i h??nh b???t ?????ng s???n n??o ?
            </p>
            <Select
              showSearch
              placeholder="Ch???n m???t trong c??c m???c"
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
                B???t ?????u
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
              <Form.Item
                label="?????a ch??? c??? th???"
                name="address"
                rules={[
                  {
                    required: true,
                    message: 'Vui l??ng nh???p ?????a ch???!'
                  }
                ]}
              >
                <Input placeholder="S??? nh??, t??n to?? nh??, t??n ???????ng" />
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
                    <Select
                      placeholder="Ch???n T???nh / Th??nh ph???"
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
                    label="Qu???n / Huy???n"
                    name="district"
                    rules={[
                      {
                        required: true,
                        message: 'Vui l??ng ch???n Qu???n / Huy???n!'
                      }
                    ]}
                  >
                    <Select
                      placeholder="Ch???n T???nh / Th??nh ph???"
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
                    label="Ph?????ng / X??"
                    name="ward"
                    rules={[
                      {
                        required: true,
                        message: 'Vui l??ng ch???n Ph?????ng / X??!'
                      }
                    ]}
                  >
                    <Select
                      placeholder="Ch???n Ph?????ng / X??"
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
                      max={infoPost?.price * 0.5}
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
              <Form.Item>
                <Row justify="space-between">
                  <Button
                    icon={<DoubleLeftOutlined />}
                    size="large"
                    onClick={() => setPercent(0)}
                  >
                    Quay l???i
                  </Button>
                  <Button type="primary" htmlType="submit" size="large">
                    Ti???p t???c
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
                Th??m ???nh cho b???t ?????ng s???n
              </p>
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
                  Quay l???i
                </Button>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleFinalSubmit()}
                >
                  Ho??n t???t ????ng b??n
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
