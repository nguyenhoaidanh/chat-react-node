import {takeLatest, call, put} from 'redux-saga/effects';
import * as type from '../actions/action-types';
/**
 * Listener lắng nghe GET_LIST_USER_ONLINE để xử lý
 */
export default function* user() {
  //
  yield takeLatest(type.APP.GET_LIST_USER_ONLINE, requestListFriendAsync);
}
function* requestListFriendAsync() {
  yield put({type: type.APP.GET_LIST_ITEM_START});
  const user = yield call(getListFriend);
  yield put({type: type.APP.GET_LIST_ITEM_END, payload: user});
}
function getListFriend() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          email: 'somemockemail@email.com',
          repository: 'http://github.com/username'
        }
      ]);
    }, 1000);
  });
}
