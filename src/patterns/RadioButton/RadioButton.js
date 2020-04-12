
const RadioButton = (props) => (
	<div className="radioGroup">
		<input onClick={props.callback} type="radio" name={props.name} checked={props.checked}/>
		<label className="label"> {props.label} </label>
	</div>
);

export default RadioButton;
