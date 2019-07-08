import React from 'react'

class HeaderChat extends React.Component {
  render() {
    return (<div className="card-header msg_head">
      <div className="d-flex bd-highlight">
        <div className="img_cont"><a target="_blank" href="https://www.facebook.com/nguyenhoaidanh0302">
          <img src={this.props.src}
            className="rounded-circle user_img" /></a>
          <span className="online_icon"></span>
        </div>
        <div className="user_info">
          <span>{'Your name: ' + this.props.name}</span>
          <p>{this.props.length} Messages</p>
        </div>
      </div>
    </div>)
  }
}

export default HeaderChat
