import './style.scss'
function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__logo">
            <img src="./images/logo.png" alt="" className="footer__image" />
          </div>
          <ul className="footer__info">
            <li className="footer__hotline">
              <p>Hotline miễn phí (24/7)</p>
              <p>1800 6268</p>
            </li>
            <li className="footer__cskh">
              <p>Chăm sóc khách hàng</p>
              <p>hotro@newhome.vn</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="footer__center">
          <div className="footer__contact">
            <h3>Liên hệ chúng tôi</h3>
            <ul>
              <li>Số 123 Nguyễn Ngọc Vũ, Trung Hoà, Cầu Giấy, Hà Nội</li>
              <li>1800 6268</li>
              <li>hotro@newhomes.vn</li>
            </ul>
          </div>
          <div className="footer__introduce">
            <h3>Giới thiệu</h3>
            <ul>
              <li>Về Newhome.vn</li>
              <li>Nghề nghiệp</li>
              <li>Hồ sơ thương hiệu</li>
              <li>Tin tức</li>
              <li>Videos</li>
            </ul>
          </div>
          <div className="footer__discover">
            <h3>Khám phá</h3>
            <ul>
              <li>Dự án bất động sản</li>
              <li>Nhà bán lẻ</li>
              <li>Nhà cho thuê</li>
              <li>Đăng tin bán nhà</li>
              <li>Đăng tin cho thuê nhà</li>
            </ul>
          </div>
          <div className="footer__rules">
            <h3>Điều khoản</h3>
            <ul>
              <li>Quy chế hoạt động</li>
              <li>Chính sách bảo mật</li>
              <li>Cơ chế giải quyết tranh chấp</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-box">
            <div className="left"></div>
            <div className="right"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
