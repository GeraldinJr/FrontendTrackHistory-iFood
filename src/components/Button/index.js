import "./style.css";

export default function Button(props) {
  const { text, onClickProp } = props;
  return (
    <button className="btn" onClick={onClickProp}>
      <p>{text}</p>
    </button>
  );
}
