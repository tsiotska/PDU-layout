import './Select.less';

const Select = (props) => (
	<select className={'select ' + props.class}  placeholder={props.placeholder}>
		{props.options.map((option) => <option>{option}</option>)}
	</select>
);

export default Select;
