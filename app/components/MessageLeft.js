import React from 'react';
import dateFormat from 'dateformat';
import {DOMAIN} from '../socket';
class MessageLeft extends React.Component {
  render() {
    const {mes} = this.props;
    return (
      <div className="d-flex justify-content-start mb-4">
        <div className="img_cont_msg">
          <img
            src={window.mapAvatar[mes.from]}
            data-toggle="tooltip"
            title={mes.name}
            className="rounded-circle user_img_msg"
          />
        </div>

        <div>
          <div className="msgName">{mes.name}</div>
          <div className="msg_cotainer">
            {mes.msg}
            {mes.files.length == 0 ? null : mes.files.length == 1 &&
              mes.files[0].type.includes('image') ? (
              <img
                className="zoom-img"
                width="250"
                src={`${mes.files[0].url}`}
              />
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
            <span className="msg_time">
              {dateFormat(new Date(mes.time), 'ddd mmm dd yyyy HH:MM:ss')}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageLeft;
