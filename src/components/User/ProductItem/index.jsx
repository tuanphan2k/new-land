import { Row } from 'antd'
import { SearchOutlined, HeartOutlined } from '@ant-design/icons'
import history from '../../../utils/history'
import './style.scss'

function ProductItem(props) {
  const { id, name, status, imgs, price, alt, address, productType } =
    props.product

  return (
    <div className="product-item">
      <div className="product-item__img">
        <img
          src={imgs[0]}
          alt={alt}
          onClick={() => history.push(`/product-detail/${id}`)}
        />
        <div className="product-item__img--new"> {status} </div>
        <ul className="product-item__toolbox">
          <li>
            <HeartOutlined />
          </li>
          <li onClick={() => history.push(`/product-detail/${id}`)}>
            <SearchOutlined />
          </li>
        </ul>
      </div>
      <div className="product-item__content">
        <h3 className="product-item__content--name">{name}</h3>
        <Row justify="space-between">
          <span>{address}</span>
          <span className="product-item__comment">{productType}</span>
        </Row>
        <p className="product-item__content--price">{`$${price}`}</p>
      </div>
    </div>
  )
}

export default ProductItem
