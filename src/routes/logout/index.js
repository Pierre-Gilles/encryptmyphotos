import { Component } from 'preact';

class LogoutPage extends Component {

  render({}, { }) {
    return (<div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper auth-page">
        <div class="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
          <div class="row w-100">
            <div class="col-lg-4 mx-auto">
              <div class="auto-form-wrapper">
                <form action="#">
                  <div class="form-group">
                    <h3 style="margin-bottom: 25px">You are now logged out!</h3>
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

export default LogoutPage;
