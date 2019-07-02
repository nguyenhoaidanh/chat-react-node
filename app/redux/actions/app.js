/**
 * Action để dispatch từ React
 */
import * as type from './action-types'

export function ListFriend() {
  return {
    type: type.APP.GET_LIST_USER_ONLINE
  }
}
export function openChat(me,isOpenChat) {
  return {
    type: type.APP.OPEN_CHAT,
    me,
    isOpenChat
  }
}

export function addMess(newMsg) {
  return {
    type: type.APP.ADD_MESSAGE,
    newMsg
  }
}