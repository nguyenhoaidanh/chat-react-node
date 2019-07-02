import * as type from '../actions/action-types'
const initialState = {
  me: {},
  friends: [],
  listMsg: [],
  isOpenChat: false
}
export default function app(state = initialState, action) {
  switch (action.type) {
    case type.APP.SET_LIST_USER_ONLINE:
      return { ...state, friends: action.friends.filter(data=>data.id!=state.me.id) }
    case type.APP.OPEN_CHAT:
      return { ...state, me: action.me, isOpenChat: action.isOpenChat }
    case type.APP.ADD_MESSAGE:
      return { ...state, listMsg: [...state.listMsg, action.newMsg] }
      case type.APP.SET_ME:
      return { ...state, me: action.me, isOpenChat: action.isOpenChat  }
    default:
      return state
  }
}
