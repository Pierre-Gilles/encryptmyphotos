import './style';



const Gallery = ({ children, ...props }) => (
  <div className="container-fluid ">

    <div id="progress-bar" style="padding-bottom: 20px;">
    
    </div>

    <div class="d-flex flex-row flex-wrap justify-content-center">

     {props.images && props.images.map((image, index) => {

       if(index % 2 === 0) return (<div></div>);

       return (
          <div class="d-flex flex-column">
             <img src={image} class="img-fluid" style="width: 300px" />
             {props.images[index+1] && <img src={props.images[index+1]} class="img-fluid" style="width: 300px" />}
          </div>
       );
     })}
    </div>
  </div>
  );


export default Gallery;