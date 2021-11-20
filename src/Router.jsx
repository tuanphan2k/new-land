import { Router, Switch } from 'react-router-dom'
import history from './utils/history'
import PATH from './constants/path'
import DefaultLayout from './layouts/DefaultLayout'
import UserHomePage from './pages/User/HomePage'

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact patch={PATH.HOME} component={UserHomePage} />
      </Switch>
    </Router>
  )
}

export default BrowserRouter
