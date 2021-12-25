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
        <DefaultLayout exact path={PATH.POSTPRODUCT} component={PostProduct} />
        <DefaultLayout
          exact
          patch={PATH.PRODUCTLIST}
          component={ProductListPage}
        />
      </Switch>
    </Router>
  )
}

export default BrowserRouter
