import { Component } from 'preact';
import Base from './Base';
import Gallery from './Gallery';
import Database from '../../api/Database';
import ProgressBar from './ProgressBar';
import Loading from './Loading';

class Home extends Component {

  state = {
    progressBarPercentage: null,
    loading: true
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
            .then(() => {
              let newPercentage = this.state.progressBarPercentage + this.state.step;
              
              if (newPercentage > 100) {
                newPercentage = 100;
              }

              this.setState({
                progressBarPercentage: newPercentage
              });
              
              resolve();
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
      step: 100/files.length
    });

    setTimeout(() => {
      this.setState({
        progressBarPercentage: 15
      });
    }, 900);

    let promises = [];
    this.currentProgress = 0;
    this.step = 1/files.length;

    for (let i = 0; i < files.length; i++) {
      let f = files[i];
      promises.push(this.uploadOneFile(f));
    }

    Promise.all(promises)
      .then(() => {
        console.log('finished');
        this.refreshImageList();
        setTimeout(() => {
          this.setState({
            progressBarPercentage: null
          });
        }, 1500);
      });

    return false;
  }

  logout = () => {
    blockstack.signUserOut();
  };

  onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }

  refreshImageList = async () => {
    //await Database.initAccount();
    let imageList = await Database.getImageList();
    let images = await Database.loadImages(imageList);
    this.setState({
      images,
      loading: false
    });
  }

  componentDidMount = async () => {

    if (blockstack.isUserSignedIn()) {
      console.log('logged in');
      await this.refreshImageList();
    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn().then(function(userData) {
        window.location = window.location.origin
      });
    }
  }

  render({}, { images }) {
    return (
      <Base onDrop={this.onDrop} onDragOver={this.onDragOver} logout={this.logout}>
        {this.state.progressBarPercentage !== null && <ProgressBar percentage={this.state.progressBarPercentage} /> }  
        { this.state.loading && <Loading />}
        { !this.state.loading && <Gallery images={images} /> }
      </Base>
    );
  }
}

export default Home;
