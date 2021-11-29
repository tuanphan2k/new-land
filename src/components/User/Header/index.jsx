import './style.scss'

function Header() {
  return (
    <div className="header">
      <div className="header__navbar">
        <a href className="header__navbar-brand">
          <img src="images/logo.png" alt="" className="header__navbar-logo" />
        </a>
        <ul className="header__navbar-list">
          <li className="header__navbar-item">
            <a href className="header__navbar-link">
              Dự án
            </a>
          </li>
          <li className="header__navbar-item">
            <a href className="header__navbar-link">
              Nhà bán lẻ
            </a>
          </li>
          <li className="header__navbar-item">
            <a href className="header__navbar-link">
              Nhà cho thuê
            </a>
          </li>
          <li className="header__navbar-item">
            <a href className="header__navbar-link">
              Giá nhà đất
            </a>
          </li>
          <li className="header__navbar-item">
            <a href className="header__navbar-link">
              Tin tức
            </a>
          </li>
        </ul>
        <ul className="header__navbar-login">
          <li className="header__login-item">Trở thành đại lí</li>
          <li className="header__login-item">
            <i className="fas fa-plus-square" /> Đăng tin
          </li>
          <li className="header__login-item">
            <i className="far fa-user" /> Tài khoản
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
