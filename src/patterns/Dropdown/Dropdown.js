import './dropdown.less';
import { useState } from 'preact/hooks';

//Provide here CHECKED logic
function Dropdown(props) {

	const [isDropOpened, toggle] = useState(false);

	return (<div className="dropdown" onClick={() => toggle(!isDropOpened)}>

		{props.iconUrl && <img className="icon" src={props.iconUrl} alt="dropdownIcon"/>}

		<span className="label">{props.name}</span>

		{isDropOpened &&
		<div className="dropdown-content">

			{props.list && props.list.map((item) => (
				<div className="item">
					<input className="radio" type="radio"/>
					<div className="label">{item}</div>
				</div>))}

		</div>}
	</div>);
}

export default Dropdown;
