import { Row, Col } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showProductList } from '../../../redux/product.slice'
import ProductItem from '../../../components/User/ProductItem'
import Loading from '../../../components/User/Loading'
import TitlePage from '../../../components/User/TitlePage'
import { useLocation } from 'react-router'
import { filterPrices } from '../../../utils/helper'
import './style.scss'

function ProductList() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.product)

  const { pathname } = useLocation()
  const categoryId = parseInt(pathname.split('/')[2])
  const categoryList = useSelector(state => state.category)

  const categoryIndex = categoryList.data.findIndex(
    item => item.id === categoryId
  )

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  const [priceSelected, setPriceSelected] = useState(null)

  useEffect(() => {
    dispatch(showProductList(categoryId))
  }, [])

  function renderPriceFilter() {
    return filterPrices.map((item, index) => (
      <li
        className={`sidebar-item ${index === priceSelected ? 'active' : ''}`}
        key={index}
        onClick={() => {
          setPriceSelected(index)
        }}
      >
        {item.start !== '8 tỷ'
          ? `${item.start} - ${item.end}`
          : `≥ ${item.start}`}
      </li>
    ))
  }

  if (productList?.loading) {
    return <Loading />
  }

  return (
    <div className="show-product">
      <Row className="show-product__title">
        <Col span={24}>
          <TitlePage
            title={categoryList?.data[categoryIndex]?.name}
            image={categoryList?.data[categoryIndex]?.image}
          />
        </Col>
      </Row>
      <Row gutter={16} className="show-product__content">
        <Col span={4} className="sidebar">
          <div className="sider__price">
            <p className="sider__price--title">Giá</p>
            <ul className="sidebar__price--list">{renderPriceFilter()}</ul>
          </div>
        </Col>
        <Col span={19}>
          <Row span={26} gutter={16} className="show-product__content--list">
            {productList?.data &&
              productList?.data.map(item => (
                <Col span={6} key={item.id}>
                  <ProductItem product={{ ...item, token: userInfo.token }} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default ProductList
