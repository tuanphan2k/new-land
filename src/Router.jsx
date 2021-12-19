import { Router, Switch } from 'react-router-dom'
import history from './utils/history'
import PATH from './constants/path'
//layouts
import DefaultLayout from './layouts/DefaultLayout'
import PrivateLayout from './layouts/PrivateLayout'
import SellerLayout from './layouts/SellerLayout'
//pages
import UserHomePage from './pages/User/HomePage'
//auth-pages
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
//admin-pages
import AdminUserPage from './pages/Admin/UserPage'
import AdminCategoryPage from './pages/Admin/CategoryPage'
import AdminDashboard from './pages/Admin/Dashboard'
//seller-pages
import SellerEmployee from './pages/Seller/Employee'

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path={PATH.HOME} component={UserHomePage} />
        <DefaultLayout exact path={PATH.LOGIN} component={LoginPage} />
        <DefaultLayout exact path={PATH.REGISTER} component={RegisterPage} />
        {/* admin */}
        <PrivateLayout exact path={PATH.USERADMIN} component={AdminUserPage} />
        <PrivateLayout
          exact
          path={PATH.CATEGORYADMIN}
          component={AdminCategoryPage}
        />
        <PrivateLayout exact path={PATH.ADMIN} component={AdminDashboard} />
        {/* seller */}
        <SellerLayout exact path={PATH.EMPLOYEE} component={SellerEmployee} />
      </Switch>
    </Router>
  )
}

export default BrowserRouter
