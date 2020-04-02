import './dropdown.less';

//	{props.iconUrl && <img src={props.iconUrl} />}
//Provide here CHECKED logic
const Dropdown = (props) => (
	<div className="dropdown">

		<i className={props.iconUrl} />
		<span>{props.name}</span>
		<div className="dropdown-content">
			{props.list && props.list.map((item) =>
				//p gives us a padding, mb rewrite it
				(<p className="item">
					<input type="radio" />
					<p>{item}</p> </p>)
			)}
		</div>
	</div>);

export default Dropdown;
