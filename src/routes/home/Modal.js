const Modal = ({ children, ...props }) => (
  <div class="tingle-modal custom-class-1 custom-class-2 tingle-modal--visible" style="">
    <button type="button" class="tingle-modal__close"><span class="tingle-modal__closeIcon">×</span><span class="tingle-modal__closeLabel">Close</span></button>
    <div class="tingle-modal-box">
      <div class="tingle-modal-box__content">
        <label>Enter the folder name:</label>
        <input type="text" value={props.newFolderName} autofocus placeholder="Folder Name" class="form-control" onKeyPress={props.onKeyPressModal} onChange={props.updateNewFolderName} />
      </div>
      <div class="tingle-modal-box__footer">
        <button class="tingle-btn tingle-btn--primary" onClick={props.createFolder}>Create folder</button>
        <button class="tingle-btn tingle-btn--danger" onClick={props.closeNewFolderModal} >Cancel</button>
      </div>
    </div>
  </div>
);

export default Modal;

