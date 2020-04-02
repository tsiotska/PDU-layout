import './Button.less';

//You can provide here callback if it requires
const Button = (props) => (
	<button className="button" type={props.type}> {props.value} </button>
);

export default Button;
