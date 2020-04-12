
const RadioButton = (props) => (
	<div className="radioGroup">
		<input className="radioInput" onClick={props.callback} type="radio" name={props.name} checked={props.checked}/>
		<label className="label"> {props.label} </label>
	</div>
);

export default RadioButton;
