import './style.scss'

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__top">
          <a href className="footer__logo">
            <img src="./images/logo.png" alt="" className="footer__image" />
          </a>
          <ul className="footer__info">
            <li className="footer__hotline">
              <p>Hotline miễn phí (24/7)</p>
              <a href>1800 6268</a>
            </li>
            <li footer__cskh>
              <p>Chăm sóc khách hàng</p>
              <a href>hotro@newhome.vn</a>
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
          <div className="footer__download">
            <h3>Tải ứng dụng</h3>
            <ul>
              {/* <li><img src="./images/apple.png" alt=""></li>
                        <li><img src="./images/google.png" alt=""></li> */}
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
