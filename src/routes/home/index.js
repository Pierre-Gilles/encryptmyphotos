import { Component } from 'preact';
import uuid from 'uuid';
import Base from './Base';
import Gallery from './Gallery';
import Database from '../../api/Database';
import ProgressBar from './ProgressBar';
import Loading from './Loading';
import EmptyState from './EmptyState';
import Promise from 'bluebird';
import update from 'immutability-helper';
import { route } from 'preact-router';
import Modal from './Modal';

const base64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALCwsMCxAMDBAXDw0PFxoUEBAUGh4XFxcXFx4dFxoZGRoXHR0jJCYkIx0vLzIyLy9AQEBAQEBAQEBAQEBAQED/2wBDAREPDxETERUSEhUUERMRFBkUFRUUGSUZGRsZGSUvIh0dHR0iLyotJiYmLSo0NC8vNDRAQD5AQEBAQEBAQEBAQED/wAARCAAFAAUDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAeEAABBAEFAAAAAAAAAAAAAAASAAEDEQITFSExQf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFxEAAwEAAAAAAAAAAAAAAAAAADGSk//aAAwDAQACEQMRAD8AjjvOpI7PMdRk1YkQSDzd134iIgpluaP/2Q==';
const folder = { isFolder: true, title: 'Holidays Brazil', id: 'c6135d08-eb23-411b-b69c-3931df555af3' };
const folders = ['Holidays Brazil', 'Family Trip Lake taho', 'Cooking Class', 'Sunset in Bali'];

const aListOfImages = folders.map((title) => ({ isFolder: true, title, id: 'ii' }));

class Home extends Component {

  state = {
    progressBarPercentage: null,
    loading: false,
    images: aListOfImages,
    showResetAccountConfirmation: false,
    displayModal: false
  };

  uploadOneFile = (f) => {
    return new Promise(async (resolve, reject) => {
      
      // Only process image files.
      if (!f.type.match('image.*')) {
        return resolve(null);
      }

      if (!f.type.match('jpeg') && !f.type.match('jpg') && !f.type.match('png')) {
        return resolve(null);
      }

      let fileSizeMegabytes = f.size / 1024 / 1024;

      if (fileSizeMegabytes > 5) {
        return resolve(null);
      }

      let reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = ((theFile) => {
        return (e) => {
          //console.log(e.target.result);
          Database.uploadImage(f, e.target.result)
            .then((imageContent) => {
              let newPercentage = this.state.progressBarPercentage + this.state.step;
              
              if (newPercentage > 100) {
                newPercentage = 100;
              }

              this.setState({
                progressBarPercentage: newPercentage
              });
              
              resolve(imageContent);
            })
            .catch((err) => reject(err));
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    });
  }

  currentProgress = 0;

  onDrop = (e) => {
    e.preventDefault();
    e.dataTransfer.effectAllowed = 'none';
    e.dataTransfer.dropEffect = 'none';
    
    let files = e.dataTransfer.files;

    this.setState({
      progressBarPercentage: 0,
      step: 100/files.length,
      dragAndDropHover: false
    });

    setTimeout(() => {
      this.setState({
        progressBarPercentage: 15
      });
    }, 900);

    this.currentProgress = 0;
    this.step = (100-15)/files.length;

    Promise.mapSeries(files, (f) => this.uploadOneFile(f))
      .then((images) => {
        console.log('finished');
        this.addImagesToList(images);
        setTimeout(() => {
          this.setState({
            progressBarPercentage: null
          });
        }, 1500);
      });

    return false;
  }

  logout = () => {
    const redirectUrl = '/logout';
    blockstack.signUserOut(redirectUrl);
  };

  onDragOver = (e) => {
    this.setState({
      dragAndDropHover: true
    });
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  onDragLeave = (e) => {
    this.setState({
      dragAndDropHover: false
    });
  }

  addImagesToList = (images) => {
    if (!images) {
      return;
    }

    images = images.filter((image) => (image !== null));

    if (images.length === 0) {
      return;
    }

    const newState = update(this.state, {
      images: { $push: images }
    });
    this.setState(newState);
  }

  refreshImageList = async () => {
    let imageList = await Database.getImageList();
    let images = await Database.loadImages(imageList);
    this.setState({
      images,
      loading: false
    });
  }

  resetAccountConfirmation = () => {
    this.setState({
      showResetAccountConfirmation: true
    });
  };

  resetAccount = async () => {
    await Database.initAccount();
    this.setState({
      showResetAccountConfirmation: false,
      images: []
    });
  };

  createFolder = async () => {
    const newFolder = {
      isFolder: true,
      title: this.state.newFolderName,
      id: uuid.v4()
    };
    const newState = update(this.state, {
      images: { $push: [newFolder] },
      newFolderName: { $set: '' },
      displayModal: { $set: false }
    });
    this.setState(newState);
  }

  openNewFolderModal = async () => {
    this.setState({
      displayModal: true
    });
  }

  closeNewFolderModal = async () => {
    this.setState({
      displayModal: false
    });
  }

  updateNewFolderName = async (e) => {
    this.setState({
      newFolderName: e.target.value
    });
  }

  onKeyPressModal = async (e) => {
    
  }

  componentDidMount = async () => {
  
    if (blockstack.isUserSignedIn()) {
      console.log('logged in');
      await this.refreshImageList();
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(function(userData) {
        window.location = window.location.origin;
      });
    } else {
      // route('/login');
    }
  }

  render({}, { images, dragAndDropHover, showResetAccountConfirmation, displayModal, newFolderName }) {
    return (
      <Base onDrop={this.onDrop} openNewFolderModal={this.openNewFolderModal} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave}  dragAndDropHover={dragAndDropHover} logout={this.logout} resetAccountConfirmation={this.resetAccountConfirmation} 
        showResetAccountConfirmation={showResetAccountConfirmation} 
        resetAccount={this.resetAccount}
        >
        {this.state.progressBarPercentage !== null && <ProgressBar percentage={this.state.progressBarPercentage} /> } 
        { this.state.loading && <Loading />}
        { !this.state.loading && <Gallery images={images} /> }
        { !this.state.loading && images && images.length === 0 && <EmptyState />}
        { displayModal && <Modal updateNewFolderName={this.updateNewFolderName} onKeyPressModal={this.onKeyPressModal} newFolderName={newFolderName} createFolder={this.createFolder} closeNewFolderModal={this.closeNewFolderModal} /> }
      </Base>
    );
  }
}

export default Home;
