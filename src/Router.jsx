import { Router, Switch } from 'react-router-dom'
import history from './utils/history'
import PATH from './constants/path'
//layouts
import DefaultLayout from './layouts/DefaultLayout'
//pages
import UserHomePage from './pages/User/HomePage'
//auth-pages
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path={PATH.HOME} component={UserHomePage} />
        <DefaultLayout exact path={PATH.LOGIN} component={LoginPage} />
        <DefaultLayout exact path={PATH.REGISTER} component={RegisterPage} />
      </Switch>
    </Router>
  )
}

export default BrowserRouter
