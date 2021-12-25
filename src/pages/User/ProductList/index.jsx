import { Row, Col, Button } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showProductList } from '../../../redux/product.slice'
import ProductItem from '../../../components/User/ProductItem'
import Loading from '../../../components/User/Loading'
import TitlePage from '../../../components/User/TitlePage'
import { useLocation } from 'react-router'
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

  useEffect(() => {
    dispatch(showProductList(categoryId))
  }, [])

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
        <Col span={6}></Col>
        <Col span={18}>
          <Row span={26} gutter ={16} className="show-product__content--list">
            {productList?.data &&
              productList?.data.map(item => (
                <Col span={6} key={item.id}>
                  <ProductItem product={item} />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default ProductList
