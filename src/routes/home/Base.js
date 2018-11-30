import { h } from 'preact';
import style from './style';

const Home = ({ children, ...props }) => (
	<div class="container-scroller">
    <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
        <a class="navbar-brand brand-logo" href="../../index.html">
          <h3 style="color:black; margin-top: 15px;">📷 Store My Photo</h3>
        </a>
        <a class="navbar-brand brand-logo-mini" href="../../index.html">
          <h3 style="color:black; margin-top: 15px;">📷</h3>
        </a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center">
        { false && <ul class="navbar-nav navbar-nav-left header-links d-none d-md-flex">
          <li class="nav-item">
            <a href="#" class="nav-link">Schedule
              <span class="badge badge-primary ml-1">New</span>
            </a>
          </li>
          <li class="nav-item active">
            <a href="#" class="nav-link">
              <i class="mdi mdi-elevation-rise"></i>Reports</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="mdi mdi-bookmark-plus-outline"></i>Score</a>
          </li>
        </ul>}
        <ul class="navbar-nav navbar-nav-right">
        <li class="nav-item">
            <a href="#" class="nav-link" onClick={props.logout}>
              <i class="mdi mdi-bookmark-plus-outline"></i>Logout</a>
          </li>
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>

    <div class="container-fluid page-body-wrapper">
      
      
      <div class={'main-panel ' + (props.dragAndDropHover === true ? 'drag-and-drop-hover' : '')} style="width: 100%" ondrop={props.onDrop} ondragover={props.onDragOver} ondragleave={props.onDragLeave}>
        <div class="content-wrapper">
          { children }
        </div>


      </div>

    </div>
  </div>
);

export default Home;
