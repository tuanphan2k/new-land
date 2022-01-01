import './style.scss'
import { Row, Col, Button, notification } from 'antd'
import { PhoneOutlined, HeartOutlined, HeartTwoTone } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavorite,
  getFavoriteList,
  deleteFavorite
} from '../../../redux/favorite.slice'
import history from '../../../utils/history'
function ProductInfo({ detail, infoDetail }) {
  const {
    id,
    city,
    district,
    ward,
    quantity,
    employees,
    description,
    deposit_time,
    deposit_price,
    name,
    price,
    token
  } = detail

  const { imageList, infoList } = infoDetail || {}

  function sliceAdress(address) {
    return address?.split('-')[1]
  }

  const favoriteList = useSelector(state => state.favorite)

  const hasProduct = favoriteList?.data?.findIndex(
    item => item.product_id === id
  )

  const commnues = [
    {
      name: 'Tân Phú'
    },
    {
      name: 'Phú Hoà Thọ'
    },
    {
      name: 'Tây Thạnh'
    },
    {
      name: 'Phú Thạnh'
    },
    {
      name: 'Tân Sơn Nhì'
    }
  ]
  const districts = [
    {
      name: 'Gò Vấp'
    },
    {
      name: 'Tân Phú'
    },
    {
      name: 'Tân Bình'
    },
    {
      name: 'Bình Thạnh'
    },
    {
      name: 'Bình Tân'
    }
  ]

  const dispatch = useDispatch()

  async function handleFavorite() {
    const res = await dispatch(
      addFavorite({
        tokens: token,
        body: {
          product_id: id
        }
      })
    )

    await notification.success({
      message: res.payload.msg
    })

    await dispatch(getFavoriteList({ tokens: token }))
  }

  async function handleDeleteFavorite() {
    const res = await dispatch(
      deleteFavorite({
        tokens: token,
        id: favoriteList?.data[hasProduct]?.id
      })
    )

    await notification.success({
      message: res.payload.msg
    })

    await dispatch(getFavoriteList({ tokens: token }))
  }

  return (
    <div className="" style={{ display: 'block' }}>
      <div className="product-info">
        <div className="product-info__left">
          <div className="basic-info">
            <Row justify="space-between">
              <h1 className="page-title">{name}</h1>
              <h2>{parseInt(price).toLocaleString('it-IT')} vnđ</h2>
            </Row>
            <div className="address">
              <p className="location" style={{ fontSize: '1.6rem' }}>
                {`${sliceAdress(ward)} - ${sliceAdress(
                  district
                )} - ${sliceAdress(city)}`}
              </p>
            </div>
            <Row justify="space-between">
              <Col>
                <h4 className="tab-title">Thông tin mô tả</h4>
              </Col>
              <Col>
                <Row>
                  <Button
                    size="large"
                    type="primary"
                    icon={<PhoneOutlined />}
                    onClick={() => history.push(`/order/${id}/${employees}`)}
                  >
                    Liên hệ đặt cọc
                  </Button>
                  <Button
                    style={{ marginLeft: '20px' }}
                    size="large"
                    onClick={() => {
                      if (hasProduct === -1) {
                        return handleFavorite()
                      }

                      return handleDeleteFavorite()
                    }}
                    icon={
                      hasProduct === -1 ? (
                        <HeartOutlined />
                      ) : (
                        <HeartTwoTone twoToneColor="#eb2f96" />
                      )
                    }
                  ></Button>
                </Row>
              </Col>
            </Row>
            <div className="wrap-description" style={{ fontSize: '1.8rem' }}>
              <div className="description">{description}</div>
            </div>
            <h4 className="tab-title">Đặc điểm</h4>
            <div className="block-properties">
              <div className="properties">
                <ul className="list-properties">
                  <Row gutter={48}>
                    <Col span={4}>
                      <li className="properties-item" key="cbd">
                        Số lượng:
                      </li>
                    </Col>
                    <Col span={20}>
                      <li className="properties-item" key="acs">
                        {quantity}
                      </li>
                    </Col>
                  </Row>
                  {infoList?.map((item, index) => (
                    <Row gutter={48}>
                      <Col span={4}>
                        <li className="properties-item" key={index}>
                          {item.title}:
                        </li>
                      </Col>
                      <Col span={20}>
                        <li className="properties-item" key={index}>
                          {item.content}
                        </li>
                      </Col>
                    </Row>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="product-info__right">
          <div className="item-sidebar">
            <h3 className="title">Mua bán nhà mặt tiền quận Tân Phú</h3>
            <ul className="list">
              {commnues.map((item, index) => (
                <li className="list-item" key={index}>
                  {item.name}
                  <span className="count">624</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="item-sidebar">
            <h3 className="title">
              Mua bán nhà mặt tiền thành phố Hồ Chí Minh
            </h3>
            <ul className="list">
              {districts.map((item, index) => (
                <li className="list-item" key={index}>
                  {item.name}
                  <span className="count">624</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
