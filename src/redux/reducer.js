import authReducer from './auth.slice'
import categoryReducer from './category.slice'
import userReducer from './user.slice'
import employeeReducer from './employee.slice'
import productReducer from './product.slice'

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  user: userReducer,
  employee: employeeReducer,
  product: productReducer
}

export default rootReducer
