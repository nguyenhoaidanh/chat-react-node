import React from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import * as type from '../actions/action-types'

import { sendToFriend } from '../../socket'
import archImg from '../../resources/images/arch.png'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      action_menu: false, chatWith: null,
      me: { src: props.app.me }, mode: props.app.mode,
      msg: '',
      listMsg: []
    }
  }
  toggleActionMenu = () => {
    this.setState({ action_menu: !this.state.action_menu })
  }
  sendMess = () => {
    const { msg, chatWith, me } = this.state;
    if (msg) {
      const data = { msg, time: new Date() }
      sendToFriend(data)
      this.setState({ msg: '' })
    }

  }
  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      chatWith: nextProps.app.chatWith,
      me: nextProps.app.me,
      mode: nextProps.app.mode,
      listMsg: nextProps.app.listMsg
    })
  }

  render() {
    //DEBUG
    if (process.env.NODE_ENV === 'development') {
      console.log('Render: ', 'Chat')
    }
    const { chatWith, me, mode, msg, listMsg = [] } = this.state;
    console.log('listMsg', listMsg);
    console.log('listMsg', me);
    if (!mode)
      return (<div className="text-center">
        <h3>Chat nhóm chẳng cần tài khoản</h3>
        <h4>Truyền file giữa các máy tính dễ dàng</h4>
        <h4>Nhập username và chat ngay</h4>
        <div className="row">
          <div className="col-md">
            <form className="form-inline username-form h-100 justify-content-center align-items-center"  >
              <div className="form-group">
                <input type="text" className="form-control username-input align-middle" placeholder="Username" /> 
                <input type="button" className="btn btn-success   text-center align-middle" value="Chat ngay" /> 
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
                <span>{'Your id: ' + this.props.app.me.id} </span>
                <p>{this.props.app.listMsg.length} Messages</p>
              </div>
            </div>
            <span id="action_menu_btn" onClick={this.toggleActionMenu}><i className="fas fa-ellipsis-v"></i></span>
          </div>

          <div className="card-body msg_card_body">

            {listMsg.map((mes, idx) =>
              mes.from !== me.id ? (<div key={idx} className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                  <img src={chatWith.src}
                    className="rounded-circle user_img_msg" />
                </div>
                <div className="msg_cotainer">
                  {mes.msg}
                  <span className="msg_time">{dateFormat(new Date(mes.time), 'ddd mmm dd yyyy HH:MM:ss')}</span>
                </div>
              </div>
              ) :
                (<div key={idx} className="d-flex justify-content-end mb-4">
                  <div className="msg_cotainer_send">
                    {mes.msg}
                    <span className="msg_time_send">{dateFormat(new Date(mes.time), 'ddd mmm dd yyyy HH:MM:ss')}</span>
                  </div>
                  <div className="img_cont_msg">
                    <img src={me.src} className="rounded-circle user_img_msg" />
                  </div>
                </div>)
            )}
          </div>
          <div className="card-footer">
            <div className="input-group">
              <div className="input-group-append">
                <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
              </div>
              <textarea name="msg" value={msg} className="form-control type_msg"
                onChange={this.inputChange}
                placeholder="Type your message..."></textarea>
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
