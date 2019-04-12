import './style';
import Folder from './Folder';

const Gallery = ({ children, ...props }) => {

  let imageBar1 = [];
  let imageBar2 = [];
  let imageBar3 = [];
  let imageBar4 = [];

  let nextOne = 1;

  props.images.forEach((image) => {
    switch (nextOne){
    case 1:
      imageBar1.push(image);
      nextOne = 2;
      break;
    case 2:
      imageBar2.push(image);
      nextOne = 3;
      break;
    case 3:
      imageBar3.push(image);
      nextOne = 4;
      break;
    case 4:
      imageBar4.push(image);
      nextOne = 1;
      break;
    }
  });

  return (
    <div className="container-fluid ">

      <div id="progress-bar" style="padding-bottom: 20px;">
      
      </div>

      <div class="d-flex flex-row flex-wrap justify-content-center">

        <div class="d-flex flex-column">
          {imageBar1 && imageBar1.map((image, index) => {
            if (image && image.isFolder === true) {
              return (<Folder folder={image} />);
            }
            return (<img src={image} class="img-fluid" style="width: 300px" />);
          })}
        </div>

        <div class="d-flex flex-column">
          {imageBar2 && imageBar2.map((image, index) => {
            if (image && image.isFolder === true) {
              return (<Folder folder={image} />);
            }
            return (<img src={image} class="img-fluid" style="width: 300px" />);
          })}
        </div>

        <div class="d-flex flex-column">
          {imageBar3 && imageBar3.map((image, index) => {
            if (image && image.isFolder === true) {
              return (<Folder folder={image} />);
            }
            return (<img src={image} class="img-fluid" style="width: 300px" />);
          })}
        </div>

        <div class="d-flex flex-column">
          {imageBar4 && imageBar4.map((image, index) => {
            if (image && image.isFolder === true) {
              return (<Folder folder={image} />);
            }
            return (<img src={image} class="img-fluid" style="width: 300px" />);
          })}

        </div>

      </div>
    </div>
  );
};


export default Gallery;