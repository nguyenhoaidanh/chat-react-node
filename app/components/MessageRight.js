import React from 'react';
import dateFormat from 'dateformat';
import {DOMAIN} from '../socket';
class MessageRight extends React.Component {
  render() {
    const {mes, me} = this.props;
    return (
      <div className="d-flex justify-content-end mb-4">
        <div className="msg_cotainer_send">
          {mes.msg}
          {mes.files.length == 0 ? null : mes.files.length == 1 &&
            mes.files[0].type.includes('image') ? (
            <img className="zoom-img" width="250" src={`${mes.files[0].url}`} />
          ) : (
            <ul className="list">
              {mes.files.map((f, i) => (
                <li
                  style={{cursor: 'pointer', color: 'brown'}}
                  key={i}
                  onClick={() => window.open(f.url)}
                >
                  <i style={{fontSize: 20}} className="fa fa-download"></i>{' '}
                  <b>
                    <u> {'  ' + f.name}</u>
                  </b>
                </li>
              ))}
            </ul>
          )}
          <span className="msg_time_send">
            {dateFormat(new Date(mes.time), 'ddd mmm dd yyyy HH:MM:ss')}
          </span>
        </div>
        <div className="img_cont_msg">
          <img src={me.src} className="rounded-circle user_img_msg" />
        </div>
      </div>
    );
  }
}

export default MessageRight;
