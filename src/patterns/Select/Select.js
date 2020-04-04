import './Select.less';

const Select = (props) => (
	<select className={props.class}  placeholder={props.placeholder} value={props.value}>
		{props.options.map((option) => <option>{option}</option>)}
	</select>
);

export default Select;
