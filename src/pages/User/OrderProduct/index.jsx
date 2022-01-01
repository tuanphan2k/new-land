import { Row, Col, Image, Button, Avatar, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/User/Loading'
import { getProductDetail } from '../../../redux/productDetail.slice'
import { getEmployeeDetail } from '../../../redux/employee.slice'
import { addOrder } from '../../../redux/order.slice'
import './style.scss'

function OrderProduct() {
  const { pathname } = useLocation()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const productId = parseInt(pathname.split('/')[2])
  const employeeId = parseInt(pathname.split('/')[3])
  const productDetail = useSelector(state => state.productDetail)
  const [employee, setEmployee] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      const res = await dispatch(getEmployeeDetail(employeeId))
      await dispatch(getProductDetail(productId))
      setEmployee(res.payload)
    }
    fetchData()
  }, [])

  function sliceAdress(address) {
    return address?.split('-')[1]
  }

  async function handleSubmitOrder() {
    const res = await dispatch(
      addOrder({ body: { product_id: productId }, tokens: userInfo.token })
    )
    await notification.success({ message: res.payload.msg })
  }

  if (!employee?.id) {
    return <Loading />
  }

  return (
    <div className="order container-1">
      <Row gutter={36}>
        <Col span={15} className="order__form">
          <Row justify="center" align="middle">
            <div className="order__form--content">
              <Row justify="center" align="middle">
                <Avatar size={86} src="https://joeschmoe.io/api/v1/random" />
              </Row>
              <h2 className="name">{employee?.full_name}</h2>
              <Row justify="space-between">
                <p>Email:</p>
                <p>{employee?.email}</p>
              </Row>
              <Row justify="space-between">
                <p>Số điện thoại:</p>
                <p>{employee?.phone_number}</p>
              </Row>
              <Row justify="space-between">
                <p>Số tài khoản:</p>
                <p>{employee?.bank_account_number}</p>
              </Row>
              <Row justify="space-between" className="price">
                <p>Số tiền cần chuyển:</p>
                <p>
                  {parseInt(productDetail.data?.deposit_price).toLocaleString(
                    'it-IT'
                  )}{' '}
                  vnđ
                </p>
              </Row>
              <Row justify="center" align="middle">
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleSubmitOrder()}
                >
                  Hoàn tất
                </Button>
              </Row>
            </div>
          </Row>
        </Col>
        <Col span={1}></Col>
        <Col span={8} className="order__product">
          <Row justify="center" align="middle">
            <Image
              width={300}
              className="order__product--img"
              src={productDetail.data?.image}
            />
          </Row>
          <Row>
            <Col span={24} className="order__product--content">
              <h2>{productDetail.data?.name}</h2>
              <div>
                <Row justify="space-between">
                  <p>Địa chỉ:</p>
                  <p className="address">
                    <span>{`${sliceAdress(
                      productDetail.data?.ward
                    )} - ${sliceAdress(
                      productDetail.data?.district
                    )} - ${sliceAdress(productDetail.data?.city)}`}</span>
                  </p>
                </Row>
                <Row justify="space-between">
                  <p>Giá:</p>
                  <p className="price">
                    {parseInt(productDetail.data?.price).toLocaleString(
                      'it-IT'
                    )}{' '}
                    vnđ
                  </p>
                </Row>
                <Row justify="space-between">
                  <p>Mô tả:</p>
                  <p className="description">
                    {productDetail.data?.description}
                  </p>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default OrderProduct
