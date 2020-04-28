import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as appActions from '../actions/app';
import {getFriend} from '../../socket';

class ListUser extends React.Component {
  componentDidMount() {
    getFriend();
  }
  render() {
    return (
      <>
        <div
          className="card mb-sm-3 mb-md-0 contacts_card my-2"
          style={{minHeight: '95vh'}}
        >
          <h4 className="mt-3 text-center" style={{color: 'white'}}>
            Chat app by <i>Nguyễn Hoài Danh</i>
          </h4>
          <hr />
          <div className="card-body contacts_body">
            <ul className="contacts">
              {this.props.app.friends.map(e => (
                <li key={e.id}>
                  <div className="d-flex bd-highlight">
                    <div className="img_cont">
                      <img src={e.src} className="rounded-circle user_img" />
                      <span className="online_icon online"></span>
                    </div>
                    <div className="user_info">
                      <span>{e.name}</span>
                      <p>Active now</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer"></div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
