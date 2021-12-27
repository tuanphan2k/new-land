import { Row } from 'antd'
import { SearchOutlined, HeartOutlined } from '@ant-design/icons'
import history from '../../../utils/history'
import './style.scss'

function ProductItem(props) {
  const { id, name, status, image, price, alt, address, productType } =
    props.product

  function sliceAdress(address) {
    return address?.split('-')[1]
  }

  return (
    <div className="product-item">
      <div className="product-item__img">
        <div className="product-item__img--section">
          <img
            src={image}
            alt={alt}
            onClick={() => history.push(`/detail/${id}`)}
          />
        </div>
        <div className="product-item__img--new"> {status} </div>
        <ul className="product-item__toolbox">
          <li>
            <HeartOutlined />
          </li>
          <li onClick={() => history.push(`/detail/${id}`)}>
            <SearchOutlined />
          </li>
        </ul>
      </div>
      <div className="product-item__content">
        <h3 className="product-item__content--name">{name}</h3>
        <Row justify="space-between">
          <span>{`${sliceAdress(props.product.city)} - 
          ${sliceAdress(props.product.district)}`}</span>
          <div></div>
        </Row>
        <Row justify="space-between">
          <span className="product-item__comment">Dự án</span>
          <p className="product-item__content--price">{`${price}vnđ`}</p>
        </Row>
      </div>
    </div>
  )
}

export default ProductItem
