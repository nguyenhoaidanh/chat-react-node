import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import {getFriend} from '../../socket' 

class ListUser extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    getFriend()
  }
  
  handleClick=(friend)=>
  { 
    this.props.appActions.setPersonChatWith(friend,'p2p')
  }
  render() {
    //DEBUG
    if (process.env.NODE_ENV === 'development') {
      console.log('Render: ', 'ListFriend')
      console.log(this.props.app.friends)
    }
    return (
      <div className="card mb-sm-3 mb-md-0 contacts_card">
        <div className="card-header">
          <div className="input-group">
            <input type="text" placeholder="Search..." name="" value={'Your friend online: '+ this.props.app.friends.length} 
            disabled className="form-control search" />
            <div className="input-group-prepend"> 
            </div>
          </div>
        </div>
        <div className="card-body contacts_body">
          <ul className="contacts">
            {this.props.app.friends.map((e, index) =>
              (<li key={e.id} onClick={()=>this.handleClick(e)}>
                <div className="d-flex bd-highlight">
                  <div className="img_cont">
                    <img src={e.src}
                      className="rounded-circle user_img" />
                    <span className="online_icon online"></span>
                  </div>
                  <div className="user_info">
                    <span>{e.name}</span>
                    <p>Active now</p>
                  </div>
                </div>
              </li>)
            )}
          </ul>
        </div>
        <div className="card-footer"></div>
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
)(ListUser)
