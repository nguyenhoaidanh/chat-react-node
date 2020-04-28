import io from 'socket.io-client';
import * as type from './redux/actions/action-types';
import archImg from './resources/images/ripple.svg';
export const DOMAIN = 'https://chat-react-node.herokuapp.com';
//export const DOMAIN = 'http://localhost:8000';
const socket = io(DOMAIN);
const configureSocket = dispatch => {
  socket.on('connect', () => {
    dispatch({
      type: type.APP.SET_ME,
      me: {
        id: socket.id,
        src: archImg,
        name: socket.id
      }
    });
  });
  socket.on(type.APP.SET_LIST_USER_ONLINE, state => {
    dispatch({type: type.APP.SET_LIST_USER_ONLINE, friends: state});
  });
  socket.on(type.APP.SOME_ONE_TYPING, data => {
    dispatch({type: type.APP.SOME_ONE_TYPING, data});
  });
  socket.on(type.APP.SEND_TO_FRIEND, state => {
    dispatch({type: type.APP.ADD_MESSAGE, newMsg: state});
  });
  return socket;
};
export const getFriend = () => socket.emit(type.APP.GET_LIST_USER_ONLINE);
export const someOneTyping = data =>
  socket.emit(type.APP.SOME_ONE_TYPING, data);
export const sendToFriend = data => {
  socket.emit(type.APP.SEND_TO_FRIEND, {...data, from: socket.id});
};
export const setName = data => {
  socket.emit(type.APP.SET_NAME, {...data, id: socket.id});
};
export default configureSocket;
