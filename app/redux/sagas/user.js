import {takeLatest, call, put} from 'redux-saga/effects';
import * as type from '../actions/action-types';
/**
 * Listener lắng nghe GET_LIST_USER_ONLINE để xử lý
 */
export default function* user() {
  yield takeLatest(type.APP.GET_LIST_USER_ONLINE, requestListFriendAsync);
}
