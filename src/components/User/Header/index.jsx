import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Row, Input, Menu, Dropdown, notification, Spin } from 'antd'
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
import './style.scss'

function Header() {
  const [isShowInput, setIsShowInput] = useState(false)
  const dispatch = useDispatch()

  const { Search } = Input

  const categoryList = useSelector(state => state.category)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  useEffect(() => {
    dispatch(getCategoryList({}))
  }, [dispatch])

  function renderCategory() {
    if (!categoryList.loading) {
      return categoryList.data?.map(item => (
        <li key={item.id} onClick={() => history.push(`/category/${item.id}`)}>
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
              <HeartOutlined />
              <span className="toolbox__item--number">1</span>
            </li>
            {userInfo?.account_type === 2 ? (
              <li className="toolbox__item">
                <BorderOuterOutlined />
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
