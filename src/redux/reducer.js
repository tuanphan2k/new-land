import authReducer from './auth.slice'
import categoryReducer from './category.slice'

const rootReducer = {
  auth: authReducer,
  category: categoryReducer
}

export default rootReducer
