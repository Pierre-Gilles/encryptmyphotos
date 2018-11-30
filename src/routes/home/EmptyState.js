const EmptyState = ({ children, ...props }) => (
  <div class="row">
    <div style="margin-left: auto; margin-right:auto; width: 300px; margin-top: 100px ">
      <img src="/assets/images/image-upload.svg" style="width: 100%" />
      <h4 style="margin-top: 20px">Drag and drop your photos here!</h4>
    </div>
  </div>
);

export default EmptyState;