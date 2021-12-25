import { useState, useEffect } from 'react'
import { Row, Col, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showProductList } from '../../../redux/product.slice'
import BannerSilder from '../../../components/User/BannerSlider'
import ProductItem from '../../../components/User/ProductItem'
import './style.scss'

function HomePage() {
  const dispatch = useDispatch()
  const productListData = useSelector(state => state.product)
  const [localSelected, setLocalSelected] = useState(1)

  useEffect(() => {
    dispatch(showProductList('Hà Nội'))
  }, [])

  function handleFilterLocal(id, name) {
    setLocalSelected(id)
    dispatch(showProductList(name))
  }

  console.log(productListData)

  const productList = [
    {
      id: 3,
      name: 'Bucket with wheels',
      isNew: true,
      price: 45,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      imgs: [
        'https://img.cenhomes.vn/330x210/2021/10/1633666878-02-anh-bird-view-ban-ngay-the-hien-tam-nhin-ho.jpg'
      ],
      rate: 4,
      alt: 'nha-dep',
      address: 'Ha Noi',
      productType: 'Chung cu',
      status: 'Đang mở bán'
    },
    {
      id: 3,
      name: 'Bucket with wheels',
      isNew: true,
      price: 45,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      imgs: [
        'https://img.cenhomes.vn/330x210/2021/10/1633666878-02-anh-bird-view-ban-ngay-the-hien-tam-nhin-ho.jpg'
      ],
      rate: 4,
      alt: 'nha-dep',
      address: 'Ha Noi',
      productType: 'Chung cu',
      status: 'Đang mở bán'
    },
    {
      id: 3,
      name: 'Bucket with wheels',
      isNew: true,
      price: 45,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      imgs: [
        'https://img.cenhomes.vn/330x210/2021/10/1633666878-02-anh-bird-view-ban-ngay-the-hien-tam-nhin-ho.jpg'
      ],
      rate: 4,
      alt: 'nha-dep',
      address: 'Ha Noi',
      productType: 'Chung cu',
      status: 'Đang mở bán'
    },
    {
      id: 3,
      name: 'Bucket with wheels',
      isNew: true,
      price: 45,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      imgs: [
        'https://img.cenhomes.vn/330x210/2021/10/1633666878-02-anh-bird-view-ban-ngay-the-hien-tam-nhin-ho.jpg'
      ],
      rate: 4,
      alt: 'nha-dep',
      address: 'Ha Noi',
      productType: 'Chung cu',
      status: 'Đang mở bán'
    },
    {
      id: 3,
      name: 'Bucket with wheels',
      isNew: true,
      price: 45,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      imgs: [
        'https://img.cenhomes.vn/330x210/2021/10/1633666878-02-anh-bird-view-ban-ngay-the-hien-tam-nhin-ho.jpg'
      ],
      rate: 4,
      alt: 'nha-dep',
      address: 'Ha Noi',
      productType: 'Chung cu',
      status: 'Đang mở bán'
    },
    {
      id: 3,
      name: 'Bucket with wheels',
      isNew: true,
      price: 45,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      imgs: [
        'https://img.cenhomes.vn/330x210/2021/10/1633666878-02-anh-bird-view-ban-ngay-the-hien-tam-nhin-ho.jpg'
      ],
      rate: 4,
      alt: 'nha-dep',
      address: 'Ha Noi',
      productType: 'Chung cu',
      status: 'Đang mở bán'
    },
    {
      id: 3,
      name: 'Bucket with wheels',
      isNew: true,
      price: 45,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      imgs: [
        'https://img.cenhomes.vn/330x210/2021/10/1633666878-02-anh-bird-view-ban-ngay-the-hien-tam-nhin-ho.jpg'
      ],
      rate: 4,
      alt: 'nha-dep',
      address: 'Ha Noi',
      productType: 'Chung cu',
      status: 'Đang mở bán'
    },
    {
      id: 3,
      name: 'Bucket with wheels',
      isNew: true,
      price: 45,
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      imgs: [
        'https://img.cenhomes.vn/330x210/2021/10/1633666878-02-anh-bird-view-ban-ngay-the-hien-tam-nhin-ho.jpg'
      ],
      rate: 4,
      alt: 'nha-dep',
      address: 'Ha Noi',
      productType: 'Chung cu',
      status: 'Đang mở bán'
    }
  ]

  const localList = [
    { name: 'Hà Nội', id: 1 },
    { name: 'TP. Hồ Chí Minh', id: 2 },
    { name: 'Đà Nẵng', id: 3 },
    { name: 'Bình Dương', id: 4 }
  ]

  return (
    <main className="home-page">
      <BannerSilder className="container-1" />
      <div className="home-page__banner container-1">
        <img
          src="https://img.cenhomes.vn/cms/baner-mid-desktop111520212-1440.jpg"
          alt=""
        />
      </div>
      <div className="home-page__hot">
        <div className="home-page__hot--product">
          <h2 className="home-page__hot--title">Các địa điểm nổi bật</h2>
          <Row className="home-page__hot--local">
            {localList.map(item => (
              <div
                key={item.id}
                className={`home-page__hot--local-item ${
                  item.id === localSelected ? 'active' : ''
                }`}
                onClick={() => handleFilterLocal(item.id, item.name)}
              >
                {item.name}
              </div>
            ))}
          </Row>
          <Row gutter={24}>
            {productList.map(item => (
              <Col span={6} key={item.id}>
                <ProductItem product={item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <div className="home-page__province container-1">
        <h2 className="home-page__province--title">
          Nhà bán tại các thành phố lớn
        </h2>
        <Row gutter={16}>
          <Col span={6} className="province__item province__item--hor">
            <img src="https://img.cenhomes.vn/province_hn.jpg" alt="" />
            <p>Hà Nội</p>
          </Col>
          <Col span={6}>
            <Space gutter={16} direction="vertical">
              <Col span={12} className="province__item province__item--ver">
                <img src="https://img.cenhomes.vn/province_hp.jpg" alt="" />
                <p>Hải Phòng</p>
              </Col>
              <Col span={12} className="province__item province__item--ver">
                <img src="https://img.cenhomes.vn/province_tth.jpg" alt="" />
                <p>Huế</p>
              </Col>
            </Space>
          </Col>
          <Col span={6} className="province__item province__item--hor">
            <Space gutter={16} direction="vertical">
              <Col span={12} className="province__item province__item--ver">
                <img src="https://img.cenhomes.vn/province_bd.jpg" alt="" />
                <p>Bình Dương</p>
              </Col>
              <Col span={12} className="province__item province__item--ver">
                <img src="https://img.cenhomes.vn/province_dn.jpg" alt="" />
                <p>Đồng Nai</p>
              </Col>
            </Space>
          </Col>
          <Col span={6} className="province__item province__item--hor">
            <img src="https://img.cenhomes.vn/province_hcm.jpg" alt="" />
            <p>TP. Hồ Chí Minh</p>
          </Col>
        </Row>
      </div>
    </main>
  )
}

export default HomePage
