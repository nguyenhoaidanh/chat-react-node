import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import dateFormat from 'dateformat'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import { sendToFriend, setName, someOneTyping, DOMAIN } from '../../socket'
import archImg from '../../resources/images/ripple.svg'
const filetitle = { fontSize: '1em', color: 'brown', fontWeight: 'bold', margin: '0px 5px 0px 5px', clear: 'both' }
const fileicon = { fontSize: 40, color: 'brown', padding: '3px 0px 0px 3px', margin: '0px 0px 0px 3px' }
const closeicon = { cursor: 'pointer', fontSize: '12px', color: 'red', position: 'absolutely', zIndex: 100, margin: '5px 5px 0px 5px', float: 'right' }
const usersendfile = { fontWeight: 'bold', float: 'right', borderLeft: '1px solid', padding: '0px 0px 0px 5px', margin: '0px 0px 0px 5px' }
const filewrap = { display: 'inline-block', backgroundColor: '#afedc5', float: 'right', border: '1px solid', padding: 0, margin: '0px 10px 10px 3px', borderRadius: '5px' }

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      me: { src: props.app.me }, isOpenChat: props.app.isOpenChat,
      msg: '', loadFile: false,
      listMsg: [], fileObjects: [], userSendFile: '',
      loading: false, someOneTyping: false
    }
  }
  sendMess = () => {
    var { msg, fileObjects, formData, me } = this.state;
    if (msg || fileObjects.length > 0) {
      if (fileObjects.length > 0) {
        this.setState({ loading: true })
        this.sendFile(formData)
      } else {
        const data = { msg, time: new Date(), files: fileObjects, src: me.src }
        sendToFriend(data)
        this.setState({ msg: '' })
      }
    }
  }
  inputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
    if (value == '\n' && name == 'msg') this.setState({ msg: '' })
    if (name == 'msg') {
      someOneTyping(true)
      setTimeout(() => {
        someOneTyping(false)
      }, 3000);
    }
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.setUsername()
  }
  keyPress = (e) => {
    if (e.keyCode == 13) this.sendMess()
  }
  setUsername = () => {
    if (this.state.username) {
      var me = { ...this.state.me, name: this.state.username }
      this.setState({ me })
      setName({ name: this.state.username })
      this.props.appActions.openChat(me, true)
    }
  }
  componentDidMount() {
    window.setInterval(function () {
      var elem = document.getElementById('data');
      if (elem)
        elem.scrollTop = elem.scrollHeight;
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      me: nextProps.app.me,
      isOpenChat: nextProps.app.isOpenChat,
      listMsg: nextProps.app.listMsg,
      someOneTyping: nextProps.app.someOneTyping,
      userSendFile: nextProps.app.me.name
    })
  }
  openFileDialog = () => {
    document.getElementById('siofu_input').click()
  }
  getFileInput = (event) => {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
      return;
    }
    const target = event.target
    var fileObjects = []
    var formData = new FormData();
    for (var i = 0; i < target.files.length; i++) {
      var file = target.files[i];
      formData.append('files', file, file.name);
      const name = file.name
      const lastDot = name.lastIndexOf('.');
      var fileName = name.substring(0, lastDot);
      fileName = fileName.length < 10 ? fileName : (fileName.substring(0, 10) + '...');
      const ext = name.substring(lastDot + 1);
      fileObjects.push({ name: fileName + '.' + ext.toUpperCase(), url: '#', type: file.type })
    }
    this.setState({ formData, fileObjects: Array.from(new Set([...this.state.fileObjects, ...fileObjects])), loadFile: true })
  }
  sendFile = (formData) => {
    var { fileObjects, msg } = this.state
    var thas = this
    this.setState({ fileObjects: [] })
    axios.post(`${DOMAIN}/sendFiles`, formData)
      .then(function (response) {
        response.data.fileUrls.forEach((url, i) => {
          fileObjects[i].url = url
        });

        const data = { msg, time: new Date(), files: fileObjects }
        thas.setState({ loading: false, msg: '' })
        sendToFriend(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  delFile = (name) => {
    this.setState({ fileObjects: this.state.fileObjects.filter(f => f.name !== name) })
  }
  render() {
    const { me, isOpenChat, loading, loadFile, msg, listMsg = [], fileObjects, userSendFile, someOneTyping } = this.state;
    if (!isOpenChat)
      return (<div className="text-center">
        <h3>Chat nhóm chẳng cần tài khoản</h3>
        <h4>Truyền file giữa các máy tính dễ dàng</h4>
        <h4>Nhập username và chat ngay</h4>
        <div className="row">
          <div className="col-md">
            <form className="form-inline username-form h-100 justify-content-center align-items-center"
              onSubmit={this.onSubmit} >
              <div className="form-group">
                <input type="text" name='username' onChange={this.inputChange}
                  className="form-control username-input align-middle" placeholder="Username" />
                <input type="button" onClick={this.setUsername}
                  className="btn btn-success text-center align-middle" value="Chat ngay" />
              </div>
              <div className="form-group">
              </div>
            </form>
          </div>
        </div>
        <img src='https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/OBaVg52wtTZ.png' />
      </div >)
    else
      return (
        <div className="card" >
          <div className="card-header msg_head">
            <div className="d-flex bd-highlight">
              <div className="img_cont">
                <img src={me.src}
                  className="rounded-circle user_img" />
                <span className="online_icon"></span>
              </div>
              <div className="user_info">
                <span>{'Your name: ' + me.name} </span>
                <p>{this.props.app.listMsg.length} Messages</p>
              </div>
            </div>
          </div>

          <div className="card-body msg_card_body" id="data">
            {listMsg.map((mes, idx) =>
              mes.from !== me.id ?
                (<div key={idx} className="d-flex justify-content-start mb-4">
                  <div className="img_cont_msg">
                    <img src='http://tinyurl.com/y4ntxzfw'
                      className="rounded-circle user_img_msg" />
                  </div>
                  <div className="msg_cotainer">
                    {mes.msg}
                    {mes.files.length == 0 ? null : mes.files.length == 1 && mes.files[0].type.includes('image') ?
                      <img className="zoom-img" width="250" src={`${DOMAIN}${mes.files[0].url}`} /> :
                      <ul className="list">
                        {mes.files.map((f, i) => (
                          <li key={i}><a href={f.url} download><i style={{ fontSize: 20 }} className="far fa-file"></i> {'  ' + f.name}</a></li>
                        ))}
                      </ul>}
                    <span className="msg_time">{dateFormat(new Date(mes.time), 'ddd mmm dd yyyy HH:MM:ss')}</span>
                  </div>
                </div>) :
                (<div key={idx} className="d-flex justify-content-end mb-4">
                  <div className="msg_cotainer_send">
                    {mes.msg}
                    {mes.files.length == 0 ? null : mes.files.length == 1 && mes.files[0].type.includes('image') ?
                      <img className="zoom-img" width="250" src={`${DOMAIN}${mes.files[0].url}`} /> :
                      <ul className="list">
                        {mes.files.map((f, i) => (
                          <li key={i}><a href={f.url} download><i style={{ fontSize: 20 }} className="far fa-file"></i> {'  ' + f.name}</a></li>
                        ))}
                      </ul>}
                    <span className="msg_time_send">{dateFormat(new Date(mes.time), 'ddd mmm dd yyyy HH:MM:ss')}</span>
                  </div>
                  <div className="img_cont_msg">
                    <img src={me.src} className="rounded-circle user_img_msg" />
                  </div>
                </div>))}
          </div>
          <div className="card-footer">
            <div style={{ maxHeight: 60, overflowY: 'auto', whiteSpace: 'nowrap' }}>
              {loadFile ?
                fileObjects.map((file, i) => (
                  <div style={filewrap} key={'file' + i} >
                    <i className="far fa-file" style={fileicon}></i>
                    <p style={usersendfile}>
                      {userSendFile.length < 10 ? userSendFile : (userSendFile.substring(0, 10) + '...')}
                      <i className="far fa-trash-alt" style={closeicon} onClick={() => this.delFile(file.name)}></i>
                      <br></br>
                      <span style={filetitle}>{file.name}</span>
                    </p>
                  </div>
                ))
                : null}
              {loading ? <React.Fragment><p style={{ fontStyle: 'italic', color: 'white' }}
                className="text-center ml-10" ><img width="40"
                  src={archImg} />Đang tải lên ...</p></React.Fragment> : null}
              {someOneTyping ?
                (<div className="y"><img src='http://tinyurl.com/y4ntxzfw'
                  className="rounded-circle x" />
                  <div className="ticontainer" data-toggle="tooltip" data-placement="right" title="Ai đó đang nhập tin nhắn !">
                    <div className="tiblock">
                      <div className="tidot"></div>
                      <div className="tidot"></div>
                      <div className="tidot"></div>
                    </div>
                  </div></div>) : null}
            </div>

            <div className="input-group">
              <div className="input-group-append">
                <span className="input-group-text attach_btn" onClick={this.openFileDialog}
                ><i className="fas fa-paperclip"></i></span>
                <input id="siofu_input" type="file" name="name" multiple onChange={this.getFileInput} style={{ display: 'none' }} />
              </div>
              <textarea name="msg" value={msg} className="form-control type_msg"
                onChange={this.inputChange} onKeyDown={this.keyPress}
                placeholder="Type your message...">
              </textarea>
              <div className="input-group-append">
                <span className="input-group-text send_btn" onClick={this.sendMess}><i className="fas fa-location-arrow"></i></span>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
