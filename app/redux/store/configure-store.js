import { createStore, compose, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import rootReducer from '../reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/index'

const sagaMiddleware = createSagaMiddleware()

function configureStoreProd(initialState) {
  const middlewares = [
    // Thêm middleware cho product

    sagaMiddleware
  ]

  let store = createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)))

  sagaMiddleware.run(rootSaga)
  return store
}

function configureStoreDev(initialState) {
  const middlewares = [
    // Thêm middleware cho dev

    // Middleware phục vụ việc báo lỗi khi chỉnh sửa state trong dispatch, không nên sử dụng trong production
    reduxImmutableStateInvariant(),

    sagaMiddleware
  ]

  //Bật chế độ debug nếu Redux Devtool đã được cài đặt
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)))

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  sagaMiddleware.run(rootSaga)

  return store
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
