import style from './progress-bar-style.css';

const Filler = ({ children, ...props }) => (
  <div className={style.filler} style={{ width: `${props.percentage}%` }} />
);

const ProgressBar = ({ children, ...props }) => (
  <div className={style.progressBar}>
    <Filler percentage={props.percentage} />
  </div>
);


export default ProgressBar;