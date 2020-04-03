import './RadioButton.less';

const RadioButton = (props) => (
	<div className="radioGroup">
		<input type="radio" name={props.name} />
		<label className="label"> {props.label} </label>
	</div>
);

export default RadioButton;
