import { Row, notification } from 'antd'
import { SearchOutlined, HeartOutlined, HeartTwoTone } from '@ant-design/icons'
import history from '../../../utils/history'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavorite,
  getFavoriteList,
  deleteFavorite
} from '../../../redux/favorite.slice'

function ProductItem(props) {
  const { id, name, status, image, price, alt, token, address, productType } =
    props.product

  function sliceAdress(address) {
    return address?.split('-')[1]
  }

  const dispatch = useDispatch()
  const favoriteList = useSelector(state => state.favorite)
  const hasProduct = favoriteList?.data.findIndex(
    item => item.product_id === id
  )

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
          <li
            onClick={() => {
              if (hasProduct === -1) {
                return handleFavorite()
              }

              handleDeleteFavorite()
            }}
          >
            {hasProduct === -1 ? (
              <HeartOutlined />
            ) : (
              <HeartTwoTone twoToneColor="#eb2f96" />
            )}
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
