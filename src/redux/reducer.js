import authReducer from './auth.slice'
import categoryReducer from './category.slice'
import userReducer from './user.slice'
import employeeReducer from './employee.slice'

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  user: userReducer,
  employee: employeeReducer
}

export default rootReducer
