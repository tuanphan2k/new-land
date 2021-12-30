import './style.scss'
import { Row, Col, Button } from 'antd'
import { PhoneOutlined, HeartOutlined } from '@ant-design/icons'
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
    image,
    price
  } = detail

  const { imageList, infoList } = infoDetail || {}

  function sliceAdress(address) {
    return address?.split('-')[1]
  }

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
                  <Button size="large" type="primary" icon={<PhoneOutlined />}>
                    Liên hệ đặt cọc
                  </Button>
                  <Button
                    style={{ marginLeft: '20px' }}
                    size="large"
                    icon={<HeartOutlined />}
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
