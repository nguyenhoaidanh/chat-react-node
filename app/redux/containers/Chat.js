import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import dateFormat from 'dateformat';
import {bindActionCreators} from 'redux';
import * as appActions from '../actions/app';
import Welcome from '../../components/Welcome';
import HeaderChat from '../../components/HeaderChat';
import Typing from '../../components/Typing';
import {sendToFriend, setName, someOneTyping, DOMAIN} from '../../socket';
import 'emoji-mart/css/emoji-mart.css';
import {Picker} from 'emoji-mart';
import archImg from '../../resources/images/ripple.svg';
import {
  filetitle,
  fileicon,
  closeicon,
  usersendfile,
  filewrap,
  srcs
} from '../../constants/constant';
import MessageLeft from '../../components/MessageLeft';
import MessageRight from '../../components/MessageRight';
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      me: {src: props.app.me},
      isOpenChat: props.app.isOpenChat,
      msg: '',
      loadFile: false,
      listMsg: [],
      fileObjects: [],
      userSendFile: '',
      loading: false,
      someOneTyping: false,
      openEmoji: false
    };
  }
  sendMess = () => {
    var {msg, fileObjects, formData, me} = this.state;
    if (msg || fileObjects.length > 0) {
      if (fileObjects.length > 0) {
        this.setState({loading: true, openEmoji: false});
        this.sendFile(formData);
      } else {
        const data = {
          msg,
          time: new Date(),
          files: fileObjects,
          src: srcs[Math.floor(Math.random() * srcs.length)],
          name: me.name
        };
        sendToFriend(data);
        this.setState({msg: '', openEmoji: false});
      }
    }
  };
  inputChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value, openEmoji: false});
    if (value == '\n' && name == 'msg') this.setState({msg: ''});
    if (name == 'msg') {
      someOneTyping(true);
      setTimeout(() => {
        someOneTyping(false);
      }, 3000);
    }
  };
  onSubmit = e => {
    e.preventDefault();
    this.setUsername();
  };
  keyPress = e => {
    if (e.keyCode == 13) this.sendMess();
  };
  setUsername = () => {
    if (this.state.username) {
      var me = {...this.state.me, name: this.state.username};
      this.setState({me});
      setName({name: this.state.username});
      this.props.appActions.openChat(me, true);
    }
  };
  componentWillUpdate(nextProps, nextState) {
    var i = 0;
    var t = setInterval(() => {
      if (i++ == 3) clearInterval(t);
      var elem = document.getElementById('data');
      if (elem) elem.scrollTop = elem.scrollHeight;
    }, 300);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      me: nextProps.app.me,
      isOpenChat: nextProps.app.isOpenChat,
      listMsg: nextProps.app.listMsg,
      someOneTyping: nextProps.app.someOneTyping,
      userSendFile: nextProps.app.me.name
    });
  }
  openFileDialog = () => {
    document.getElementById('siofu_input').click();
  };
  getFileInput = event => {
    if (
      !event ||
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }
    const target = event.target;
    var fileObjects = [];
    var formData = new FormData();
    for (var i = 0; i < target.files.length; i++) {
      var file = target.files[i];
      formData.append('files', file, file.name);
      const name = file.name;
      const lastDot = name.lastIndexOf('.');
      var fileName = name.substring(0, lastDot);
      fileName =
        fileName.length < 10 ? fileName : fileName.substring(0, 10) + '...';
      const ext = name.substring(lastDot + 1);
      fileObjects.push({
        name: fileName + '.' + ext.toUpperCase(),
        url: '#',
        type: file.type
      });
    }
    this.setState({
      formData,
      openEmoji: false,
      fileObjects: Array.from(
        new Set([...this.state.fileObjects, ...fileObjects])
      ),
      loadFile: true
    });
  };
  onUploadProgress = progressEvent => {
    const {loaded, total} = progressEvent;
    let percent = Math.floor((loaded / total) * 100);
    this.setState({percent});
  };
  sendFile = formData => {
    var {fileObjects, msg, me} = this.state;
    var thas = this;
    this.setState({fileObjects: [], openEmoji: false});
    axios
      .post(`${DOMAIN}/sendFiles`, formData, {
        onUploadProgress: this.onUploadProgress
      })
      .then(function(response) {
        response.data.fileUrls.forEach((url, i) => {
          fileObjects[i].url = DOMAIN + url;
        });
        const data = {
          msg,
          time: new Date(),
          files: fileObjects,
          src: srcs[Math.floor(Math.random() * srcs.length)],
          name: me.name
        };
        thas.setState({loading: false, msg: ''});
        sendToFriend(data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  delFile = name => {
    this.setState({
      fileObjects: this.state.fileObjects.filter(f => f.name !== name)
    });
  };
  onEmojiClick = e => {
    const {msg} = this.state;
    this.setState({msg: msg + e.native});
  };
  toggleEmoji = value => {
    const {openEmoji} = this.state;
    if (value !== undefined) this.setState({openEmoji: value});
    else this.setState({openEmoji: !openEmoji});
  };
  render() {
    const {
      me,
      isOpenChat,
      loading,
      loadFile,
      msg,
      listMsg = [],
      fileObjects,
      openEmoji,
      userSendFile,
      someOneTyping,
      percent = 0
    } = this.state;
    if (!isOpenChat)
      return (
        <Welcome
          inputChange={this.inputChange}
          setUsername={this.setUsername}
          onSubmit={this.onSubmit}
        />
      );
    else
      return (
        <div className="card">
          <HeaderChat
            name={me.name}
            src={me.src}
            length={this.props.app.listMsg.length}
          />
          <div className="card-body msg_card_body" id="data">
            {listMsg.map((mes, idx) =>
              mes.from !== me.id ? (
                <MessageLeft key={idx} mes={mes} />
              ) : (
                <MessageRight key={idx} mes={mes} me={me} />
              )
            )}
          </div>

          <div className="card-footer">
            <div
              style={{maxHeight: 60, overflowY: 'auto', whiteSpace: 'nowrap'}}
            >
              {loadFile
                ? fileObjects.map((file, i) => (
                    <div style={filewrap} key={'file' + i}>
                      <i className="far fa-file" style={fileicon}></i>
                      <p style={usersendfile}>
                        {userSendFile.length < 10
                          ? userSendFile
                          : userSendFile.substring(0, 10) + '...'}
                        <i
                          className="far fa-trash-alt"
                          style={closeicon}
                          onClick={() => this.delFile(file.name)}
                        ></i>
                        <br></br>
                        <span style={filetitle}>{file.name}</span>
                      </p>
                    </div>
                  ))
                : null}
              {loading ? (
                <React.Fragment>
                  <p
                    style={{fontStyle: 'italic', color: 'white'}}
                    className="text-center ml-10"
                  >
                    <img width="40" src={archImg} />
                    Đang tải file lên {percent} % ...
                  </p>
                </React.Fragment>
              ) : null}
              {someOneTyping ? <Typing /> : null}
            </div>

            <div className="input-group">
              <div className="input-group-append">
                <span
                  className="input-group-text attach_btn"
                  onClick={this.openFileDialog}
                >
                  <i className="fas fa-paperclip"></i>
                </span>
                <input
                  id="siofu_input"
                  type="file"
                  name="name"
                  multiple
                  onChange={this.getFileInput}
                  style={{display: 'none'}}
                />

                <span
                  onClick={() => this.setState({openEmoji: !openEmoji})}
                  className="input-group-text emoji_btn"
                >
                  <i className="fas fa-smile"></i>
                </span>
                {openEmoji ? (
                  <div>
                    <Picker onSelect={this.onEmojiClick} />
                  </div>
                ) : null}
              </div>
              <textarea
                name="msg"
                value={msg}
                className="form-control type_msg"
                onFocus={() => this.setState({openEmoji: false})}
                onChange={this.inputChange}
                onKeyDown={this.keyPress}
                placeholder="Type your message..."
              ></textarea>

              <div className="input-group-append">
                <span
                  className="input-group-text send_btn"
                  onClick={this.sendMess}
                >
                  <i className="fas fa-location-arrow"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
