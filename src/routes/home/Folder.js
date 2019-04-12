import { Link } from 'preact-router/match';

const Folder = ({ children, ...props }) => (
  <div style="width: 300px;">
    <Link href={`/folder/${props.folder.id}`} >
      <img src="/assets/images/folder.svg" class="mx-auto d-block" style="width: 80%" />
      <h4 class="text-center" style="margin-top: 20px">{props.folder.title}</h4>
    </Link>
  </div>
);

export default Folder;