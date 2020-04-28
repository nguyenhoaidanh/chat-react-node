import * as type from '../actions/action-types';
import {srcs} from '../../constants/constant';
window.mapAvatar = {};
const initialState = {
  me: {},
  friends: [],
  listMsg: [],
  isOpenChat: false,
  someOneTyping: false
};
export default function app(state = initialState, action) {
  switch (action.type) {
    case type.APP.SET_LIST_USER_ONLINE:
      let friends = action.friends.filter(data => data.id != state.me.id);
      return {
        ...state,
        friends: friends.map(e => {
          const src = srcs[Math.floor(Math.random() * srcs.length)];
          window.mapAvatar[e.id] = src;
          return {...e, src};
        })
      };
    case type.APP.ADD_MESSAGE:
      return {...state, listMsg: [...state.listMsg, action.newMsg]};
    case type.APP.SET_ME:
      return {...state, me: action.me, isOpenChat: action.isOpenChat};
    case type.APP.SOME_ONE_TYPING:
      return {...state, someOneTyping: action.data};
    default:
      return state;
  }
}
