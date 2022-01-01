import authReducer from './auth.slice'
import categoryReducer from './category.slice'
import userReducer from './user.slice'
import employeeReducer from './employee.slice'
import productReducer from './product.slice'
import productDetailReducer from './productDetail.slice'
import newsReducer from './news.slice'
import favoriteReducer from './favorite.slice'
import orderReducer from './order.slice'
import orderManaReducer from './orderMana.slice'

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  user: userReducer,
  employee: employeeReducer,
  product: productReducer,
  productDetail: productDetailReducer,
  news: newsReducer,
  favorite: favoriteReducer,
  order: orderReducer,
  orderMana: orderManaReducer
}

export default rootReducer
