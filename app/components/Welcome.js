import React from 'react';

class Welcome extends React.Component {
  render() {
    return (
      <div className="text-center">
        <h3>Chat nhóm không cần tài khoản</h3>
        <h4>Truyền file giữa các thiết bị dễ dàng</h4>
        <h4>Nhập tên và chat ngay</h4>
        <div className="row">
          <div className="col-md">
            <form
              className="form-inline username-form h-100 justify-content-center align-items-center"
              onSubmit={this.props.onSubmit}
            >
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  onChange={this.props.inputChange}
                  className="form-control username-input align-middle"
                  placeholder="Username"
                />
                <input
                  type="button"
                  onClick={this.props.setUsername}
                  className="btn btn-success text-center align-middle"
                  value="Chat ngay"
                />
              </div>
              <div className="form-group"></div>
            </form>
          </div>
        </div>
        <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yi/r/OBaVg52wtTZ.png" />
      </div>
    );
  }
}

export default Welcome;
