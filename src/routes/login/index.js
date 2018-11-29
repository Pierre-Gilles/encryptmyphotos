import { Component } from 'preact';

class LoginPage extends Component {

  login = () => {
    blockstack.redirectToSignIn();
  };

  render({}, { }) {
    return (<div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper auth-page">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auto-form-wrapper">
                <form action="#">
                  <div class="form-group">
                    <button class="btn btn-block btn-success" onClick={this.login}>Log in with Blockstack</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default LoginPage;
