import { Component } from 'preact';
import Base from './Base';
import Gallery from './Gallery';
import Database from '../../api/Database';
import ProgressBar from './ProgressBar';
import Loading from './Loading';
import EmptyState from './EmptyState';
import Promise from 'bluebird';
import update from 'immutability-helper';
import { route } from 'preact-router';

class Home extends Component {

  state = {
    progressBarPercentage: null,
    loading: true,
    showResetAccountConfirmation: false
  };

  uploadOneFile = (f) => {
    return new Promise(async (resolve, reject) => {
      
      // Only process image files.
      if (!f.type.match('image.*')) {
        return resolve();
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

  componentDidMount = async () => {
    if (blockstack.isUserSignedIn()) {
      console.log('logged in');
      await this.refreshImageList();
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(function(userData) {
        window.location = window.location.origin;
      });
    } else {
      route('/login');
    }
  }

  render({}, { images, dragAndDropHover, showResetAccountConfirmation }) {
    return (
      <Base onDrop={this.onDrop} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave}  dragAndDropHover={dragAndDropHover} logout={this.logout} resetAccountConfirmation={this.resetAccountConfirmation} 
        showResetAccountConfirmation={showResetAccountConfirmation} 
        resetAccount={this.resetAccount}
        >
        {this.state.progressBarPercentage !== null && <ProgressBar percentage={this.state.progressBarPercentage} /> } 
        { this.state.loading && <Loading />}
        { !this.state.loading && <Gallery images={images} /> }
        { !this.state.loading && images && images.length === 0 && <EmptyState />}
      </Base>
    );
  }
}

export default Home;
