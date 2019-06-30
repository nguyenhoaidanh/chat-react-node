import { takeLatest, call, put } from 'redux-saga/effects'
import * as type from '../actions/action-types'

/**
 * Listener lắng nghe GET_LIST_USER_ONLINE để xử lý
 */
export default function* user() {
  yield takeLatest(type.APP.GET_LIST_USER_ONLINE, requestListFriendAsync)
}

/**
 * Function xử lý chính của SAGA
 * Ví dụ bên dưới:
 * 1. Dispatch GET_LIST_ITEM_START cho reducer trước
 * 2. Gọi API async
 * 3. Dispatch GET_LIST_ITEM_END với data lấy được từ API
 */

function* requestListFriendAsync() {
  yield put({ type: type.APP.GET_LIST_ITEM_START })

  const user = yield call(getListFriend)

  yield put({ type: type.APP.GET_LIST_ITEM_END, payload: user })
}

/**
 * Ví dụ sử dụng promise giả lập gọi API bên ngoài
 */
function getListFriend() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          email: 'somemockemail@email.com',
          repository: 'http://github.com/username'
        },
        {
          email: 'email2@email.com',
          repository: 'http://github.com/email2'
        },
        {
          email: 'email3@email.com',
          repository: 'http://github.com/email3'
        },
        {
          email: 'email4@email.com',
          repository: 'http://github.com/email4'
        }
      ])
    }, 1000)
  })
}
