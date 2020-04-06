import './dropdown.less';
import {useState} from 'preact/hooks';

//	{props.iconUrl && <img src={props.iconUrl} />}
//Provide here CHECKED logic
function Dropdown(props) {

	const [isDropOpened, toggle] = useState(false);

	return (<div className="dropdown" onClick={() => toggle(!isDropOpened)}>

		<i className={props.iconUrl} />

		<span>{props.name}</span>

		{isDropOpened &&
		<div className="dropdown-content">

			{props.list && props.list.map((item) => (
				<div className="item">
					<input className="radio" type="radio" />
					<div className="label">{item}</div>
				</div>))}

		</div>}
	</div>);
}

export default Dropdown;
