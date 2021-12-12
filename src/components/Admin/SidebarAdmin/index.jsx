import PATH from '../../../constants/path'
import history from '../../../utils/history'
import { Layout, Menu, Row } from 'antd'
import logo from '../../../assets/logos/logo.png'

import {
  AppstoreOutlined,
  HomeOutlined,
  LogoutOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons'
import './style.scss'

function SidebarAdmin() {
  const { Sider } = Layout
  return (
    <section className="sidebar">
      <Layout>
        <Sider
          className="sidebar__main"
          width="260px"
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Row justify="center" onClick={() => history.push(PATH.ADMIN)}>
            <div className="sidebar__logo">
              <img src={logo} alt="" />
            </div>
          </Row>
          <Menu theme="" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item
              key="1"
              icon={<HomeOutlined />}
              onClick={() => {
                history.push(PATH.HOMEADMIN)
              }}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<AppstoreOutlined />}
              onClick={() => {
                history.push(PATH.CATEGORYADMIN)
              }}
            >
              Quản lý danh mục
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<UsergroupAddOutlined />}
              onClick={() => {
                history.push(PATH.USERADMIN)
              }}
            >
               Quản lý người dùng
            </Menu.Item>
            <Menu.Item
              key="7"
              icon={<LogoutOutlined />}
              onClick={() => {
                history.push(PATH.HOME)
              }}
            >
              Quay về trang người dùng
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </section>
  )
}

export default SidebarAdmin