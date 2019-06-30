/**
 * Action để dispatch từ React
 */
import * as type from './action-types'

export function ListFriend() {
  return {
    type: type.APP.GET_LIST_USER_ONLINE
  }
}
export function setPersonChatWith(friend,mode) {
  return {
    type: type.APP.SET_PERSON_CHAT_WITH,
    friend,
    mode
  }
}

export function addMess(newMsg) {
  return {
    type: type.APP.ADD_MESSAGE,
    newMsg
  }
}