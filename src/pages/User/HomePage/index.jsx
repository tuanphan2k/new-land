import BannerSilder from '../../../components/User/BannerSlider'
import './style.scss'

function HomePage() {
  return (
    <main className="home-page container-1">
      <BannerSilder />
      <div className="home-page__banner">
        <img
          src="https://img.cenhomes.vn/cms/baner-mid-desktop111520212-1440.jpg"
          alt=""
        />
      </div>
    </main>
  )
}

export default HomePage
