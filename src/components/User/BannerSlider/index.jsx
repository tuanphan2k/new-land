import { Carousel } from 'antd'
import './style.scss'

function BannerSilder() {
  const bannerList = [
    {
      imgUrl:
        'http://lezada.reactdemo.hasthemes.com/assets/images/hero-slider/hero-slider-one/1.jpg',
      type: 'Accessories',
      content: 'Bottle Grinder, Small, 2-Piece'
    },
    {
      imgUrl:
        'http://lezada.reactdemo.hasthemes.com/assets/images/hero-slider/hero-slider-one/2.jpg',
      type: 'HandMade',
      content: 'Large, Food Board'
    },
    {
      imgUrl:
        'http://lezada.reactdemo.hasthemes.com/assets/images/hero-slider/hero-slider-one/3.jpg',
      type: 'Accessories',
      content: 'Tribeca Hubert, Pendant'
    }
  ]

  function renderBannerList() {
    return bannerList.map((item, index) => {
      return (
        <div key={index} className="banner-slider__item">
          <div className="relative">
            <img src={`${item.imgUrl}`} alt="banner" />
            <div className="banner-slider__content">
              <h3>{item.type}</h3>
              <h2>{item.content}</h2>
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="banner-slider">
      <Carousel autoplay>{renderBannerList()}</Carousel>
    </div>
  )
}

export default BannerSilder
