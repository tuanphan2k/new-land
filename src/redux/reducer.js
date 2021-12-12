import authReducer from './auth.slice'
import categoryReducer from './category.slice'
import userReducer from './user.slice'

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  user: userReducer
}

export default rootReducer
