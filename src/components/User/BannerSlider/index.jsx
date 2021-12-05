import { Carousel } from 'antd'
import bannerImg2 from '../../../assets/images/bannerImg2.jpeg'
import bannerImg3 from '../../../assets/images/bannerImg3.jpeg'
import bannerImg4 from '../../../assets/images/bannerImg4.jpeg'
import './style.scss'

function BannerSilder() {
  const bannerList = [
    {
      imgUrl: bannerImg3,
      type: 'Accessories',
      content: 'Bottle Grinder, Small, 2-Piece'
    },
    {
      imgUrl: bannerImg2,
      type: 'HandMade',
      content: 'Large, Food Board'
    },
    {
      imgUrl: bannerImg4,
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
