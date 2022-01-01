import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Row, Input, Menu, Col, Dropdown, notification, Spin } from 'antd'
import history from '../../../utils/history'
import {
  SearchOutlined,
  HeartOutlined,
  BorderOuterOutlined,
  UserOutlined,
  CloseOutlined,
  LoginOutlined
} from '@ant-design/icons'
import Logo from '../../../assets/logos/logo.png'
import { getCategoryList } from '../../../redux/category.slice'
import { getFavoriteList } from '../../../redux/favorite.slice'
import './style.scss'

function Header() {
  const [isShowInput, setIsShowInput] = useState(false)
  const dispatch = useDispatch()

  const { Search } = Input

  const categoryList = useSelector(state => state.category)
  const favoriteList = useSelector(state => state.favorite)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    dispatch(getCategoryList({}))
    dispatch(getFavoriteList({ tokens: userInfo.token }))
  }, [dispatch])

  function renderCategory() {
    if (!categoryList.loading) {
      return categoryList.data?.map(item => (
        <li
          key={item.id}
          onClick={() => history.push(`/product-list/${item.id}`)}
        >
          {item.name}
        </li>
      ))
    }

    return <Spin />
  }

  function handleSearchProduct(value) {
    history.push(`/search?q=${value}`)
  }

  function handleLogout() {
    localStorage.clear()
    notification.success({
      message: 'Đăng xuất thành công'
    })
    history.push('/login')
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => history.push('/profile')}>
        {`Tài khoản của tôi (${userInfo?.name})`}
      </Menu.Item>
      {userInfo?.account_type === 0 ? (
        <Menu.Item key="3" onClick={() => history.push('/admin')}>
          Trở về trang Admin
        </Menu.Item>
      ) : userInfo?.account_type === 2 ? (
        <Menu.Item key="4" onClick={() => history.push('/seller/employee')}>
          Quản lý
        </Menu.Item>
      ) : (
        ''
      )}
      <Menu.Item key="2" onClick={() => handleLogout()}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  )

  const menuPost = (
    <Menu>
      <Menu.Item key="1" onClick={() => history.push('/post-product')}>
        Đăng bán Bất động sản
      </Menu.Item>
      <Menu.Item key="1" onClick={() => history.push('/post-news')}>
        Đăng tin
      </Menu.Item>
    </Menu>
  )

  const menuFavorite = (
    <Menu className="header__menu">
      {favoriteList?.data.map(item => (
        <Menu.Item
          key={item.id}
          onClick={() => history.push(`/detail/${item.product_id}`)}
        >
          <Row
            justify="space-between"
            gutter={8}
            className="header__menu--item-content"
          >
            <Col span={4}></Col>
            <Col span={16}>
              <div>hahasdfsdfsdfsdfsdfsa</div>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <>
      <header className="header">
        <Row
          className="header__section container-1"
          justify="space-between"
          align="middle"
        >
          <img src={Logo} alt="logo" onClick={() => history.push('/')} />

          {isShowInput ? (
            <Search
              className="header__search"
              size="large"
              placeholder="Search product..."
              onSearch={value => handleSearchProduct(value)}
              enterButton
            />
          ) : (
            <ul className="header__category">{renderCategory()}</ul>
          )}

          <ul className="header__toolbox">
            <li className="toolbox__item">
              {isShowInput ? (
                <CloseOutlined onClick={() => setIsShowInput(!isShowInput)} />
              ) : (
                <SearchOutlined onClick={() => setIsShowInput(!isShowInput)} />
              )}
            </li>
            <li className="toolbox__item">
              <Dropdown
                overlay={menuFavorite}
                onClick={e => e.preventDefault()}
              >
                <div>
                  <HeartOutlined />
                  <span className="toolbox__item--number">
                    {favoriteList?.data.length}
                  </span>
                </div>
              </Dropdown>
            </li>
            {userInfo?.account_type === 2 ? (
              <li className="toolbox__item">
                <Dropdown overlay={menuPost} onClick={e => e.preventDefault()}>
                  <BorderOuterOutlined />
                </Dropdown>
              </li>
            ) : (
              ''
            )}
            {userInfo ? (
              <li className="toolbox__item">
                <Dropdown overlay={menu} onClick={e => e.preventDefault()}>
                  <UserOutlined />
                </Dropdown>
              </li>
            ) : (
              <li className="toolbox__item">
                <LoginOutlined onClick={() => history.push('/login')} />
              </li>
            )}
          </ul>
        </Row>
      </header>
    </>
  )
}

export default Header
