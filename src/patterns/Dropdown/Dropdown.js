import './dropdown.less';
import { useState } from 'preact/hooks';

//	{props.iconUrl && <img src={props.iconUrl} />}
//Provide here CHECKED logic
function Dropdown (props) {

	const [isDropOpened, toggle] = useState(false);

	return (<div className="dropdown" onClick={() => toggle(!isDropOpened)}>

		<i className={props.iconUrl} />
		<span>{props.name}</span>
		{isDropOpened &&
		<div className="dropdown-content">
			{props.list && props.list.map((item) =>
				//p gives us a padding, mb rewrite it
				(<p className="item">
					<input type="radio" />
					<p>{item}</p> </p>)
			)}
		</div>}
	</div>);
}

export default Dropdown;
