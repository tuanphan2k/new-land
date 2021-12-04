import { useState } from 'react'
import BannerSilder from '../../../components/User/BannerSlider'
import ProductItem from '../../../components/User/ProductItem'
import { Row, Col } from 'antd'
import './style.scss'

function HomePage() {
  const [localSelected, setLocalSelected] = useState(1)

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
    <main className="home-page container-1">
      <BannerSilder />
      <div className="home-page__banner">
        <img
          src="https://img.cenhomes.vn/cms/baner-mid-desktop111520212-1440.jpg"
          alt=""
        />
      </div>
      <div className="home-page__hot">
        <h2 className="home-page__hot--title">Các địa điểm nổi bật</h2>
        <Row className="home-page__hot--local">
          {localList.map(item => (
            <div
              key={item.id}
              className={`home-page__hot--local-item ${
                item.id === localSelected ? 'active' : ''
              }`}
              onClick={() => setLocalSelected(item.id)}
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
    </main>
  )
}

export default HomePage
