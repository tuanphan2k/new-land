import { Router, Switch } from 'react-router-dom'
import history from './utils/history'
import PATH from './constants/path'
//layouts
import DefaultLayout from './layouts/DefaultLayout'
import PrivateLayout from './layouts/PrivateLayout'
import SellerLayout from './layouts/SellerLayout'
//pages
import UserHomePage from './pages/User/HomePage'
import ProductListPage from './pages/User/ProductList'
import ProductDetailPage from './pages/User/ProductDetail'
import NewsUerList from './pages/User/News'
import OrderProductPage from './pages/User/OrderProduct'
import ProfilePage from './pages/User/Profile'
//auth-pages
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
//admin-pages
import AdminUserPage from './pages/Admin/UserPage'
import AdminCategoryPage from './pages/Admin/CategoryPage'
import AdminDashboard from './pages/Admin/Dashboard'
//seller-pages
import SellerEmployee from './pages/Seller/Employee'
import PostProduct from './pages/Seller/PostProduct'
import ProducPage from './pages/Seller/Product'
import NewsPage from './pages/Seller/News'
import NewsListPage from './pages/Seller/News/NewsList'
import OrderManaPage from './pages/Seller/OrderMana'

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path={PATH.HOME} component={UserHomePage} />
        <DefaultLayout exact path={PATH.LOGIN} component={LoginPage} />
        <DefaultLayout exact path={PATH.REGISTER} component={RegisterPage} />
        <PrivateLayout exact path={PATH.USERADMIN} component={AdminUserPage} />
        <PrivateLayout
          exact
          path={PATH.CATEGORYADMIN}
          component={AdminCategoryPage}
        />
        <PrivateLayout exact path={PATH.ADMIN} component={AdminDashboard} />
        <SellerLayout exact path={PATH.EMPLOYEE} component={SellerEmployee} />
        <SellerLayout exact path={PATH.PRODUCT} component={ProducPage} />
        <SellerLayout exact path={PATH.NEWSLIST} component={NewsListPage} />

        <DefaultLayout exact path={PATH.NEWS} component={NewsPage} />
        <DefaultLayout exact path={PATH.NEWSUSERLIST} component={NewsUerList} />
        <DefaultLayout exact path={PATH.POSTPRODUCT} component={PostProduct} />

        <DefaultLayout
          exact
          path={PATH.PRODUCTLIST}
          component={ProductListPage}
        />
        <DefaultLayout
          exact
          path={PATH.PRODUCTDETAIL}
          component={ProductDetailPage}
        />
        <DefaultLayout exact path={PATH.NEWSUPDATE} component={NewsPage} />
        <DefaultLayout
          exact
          path={PATH.ORDERPRODUCT}
          component={OrderProductPage}
        />
        <DefaultLayout exact path={PATH.PROFILE} component={ProfilePage} />
        <SellerLayout exact path={PATH.ORDERMANA} component={OrderManaPage} />
      </Switch>
    </Router>
  )
}

export default BrowserRouter
