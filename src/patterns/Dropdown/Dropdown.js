import {useState} from 'preact/hooks';

//Provide here CHECKED logic
function Dropdown(props) {

	const [isDropOpened, toggle] = useState(false);
	const [selectedValue, changeValue] = useState(props.list[0]);

	return (<div className="dropdown" onClick={() => toggle(!isDropOpened)}>

		{props.iconUrl &&
		<div className="iconContainer">
			<img className="icon" src={props.iconUrl} alt="dropdownIcon"/>
		</div>}

		<span className="label">{selectedValue}</span>

		{isDropOpened &&
		<div className="dropdown-content">
			{props.list && props.list.map((item) => (
				<div className="item" onClick={()=> changeValue(item)}>
					<input className="radio" type="radio"/>
					<div className={"label " + (selectedValue===item ? "On" : "")}>{item}</div>
				</div>))}
		</div>}
	</div>);
}

export default Dropdown;
