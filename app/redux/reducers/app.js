import * as type from '../actions/action-types'
const initialState = {
  me: {},
  friends: [],
  chatWith: [],
  listMsg: [],
  mode: null // else room/p2p
}
export default function app(state = initialState, action) {
  switch (action.type) {
    case type.APP.SET_LIST_USER_ONLINE:
      return { ...state, friends: action.friends.filter(data=>data.id!=state.me.id) }
    case type.APP.SET_PERSON_CHAT_WITH:
      return { ...state, chatWith: action.friend, mode: action.mode }
    case type.APP.ADD_MESSAGE:
      return { ...state, listMsg: [...state.listMsg, action.newMsg] }
      case type.APP.SET_ME:
      return { ...state, me: action.me }
    default:
      return state
  }
}
