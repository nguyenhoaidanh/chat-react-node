import React from 'react';
import {srcs} from '../constants/constant';
class Typing extends React.Component {
  render() {
    return (
      <div className="y">
        <img src={srcs[0]} className="rounded-circle x" />
        <div
          className="ticontainer"
          data-toggle="tooltip"
          data-placement="right"
          title="Ai đó đang nhập tin nhắn !"
        >
          <div className="tiblock">
            <div className="tidot"></div>
            <div className="tidot"></div>
            <div className="tidot"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Typing;
