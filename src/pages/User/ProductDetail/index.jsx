import './style.scss'
import ProductInfo from '../../../components/User/ProductInfo'
import {
  getProductDetail,
  getImage,
  getInfo
} from '../../../redux/productDetail.slice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import Loading from '../../../components/User/Loading'
import { Carousel } from 'antd'
function ProductDetail() {
  const dispatch = useDispatch()

  const productDetail = useSelector(state => state.productDetail)
  const { pathname } = useLocation()
  const productId = parseInt(pathname.split('/')[2])
  const [infoDetail, setInfoDetail] = useState()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    dispatch(getProductDetail(productId))

    async function getDetail() {
      try {
        const resImage = await dispatch(getImage({ id: productId }))
        const resInfo = await dispatch(getInfo({ id: productId }))
        setInfoDetail({
          imageList: resImage?.payload,
          infoList: resInfo.payload
        })
      } catch (err) {}
    }

    getDetail()
  }, [])

  if (!infoDetail?.imageList) {
    return <Loading />
  }

  const dataSource = infoDetail?.imageList.map(item => {
    return item.image
  })

  return (
    <div className="product-detail container-1">
      <section className="product-detail__content">
        <div className="product-detail__slider">
          <Carousel autoplay>
            {(
              (dataSource && [productDetail?.data?.image, ...dataSource]) ||
              []
            ).map((item, index) => {
              return (
                <div key={index} className="img-block">
                  <img src={`${item}`} alt="" />
                </div>
              )
            })}
          </Carousel>
        </div>
        <ProductInfo
          key={productDetail.id}
          detail={{ ...productDetail.data, token: userInfo.token }}
          infoDetail={infoDetail}
        />
      </section>
    </div>
  )
}

export default ProductDetail
