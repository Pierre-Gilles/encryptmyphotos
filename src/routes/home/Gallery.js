import './style';



const Gallery = ({ children, ...props }) => (
  <div class="container-fluid">

    <div id="progress-bar" style="padding-bottom: 20px;">
    
    </div>

    <div class="d-flex flex-row flex-wrap justify-content-center">

     {props.images && props.images.map((image) => {

       return (
          <div class="d-flex flex-column">
             <img src={image} class="img-fluid" style="width: 300px" />
          </div>
       );
     })}
    </div>
  </div>
  );


export default Gallery;