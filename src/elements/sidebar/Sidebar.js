
import {Link} from 'preact-router/match';
import {ROUTE} from '../../constants/Routes';
import './Sidebar.less';

export default function Sidebar(props) {
	console.log('render: ' + props.render);
	return (<div id="sidebar" className="sidebar">
		<nav className="navList">
			{props.render === 'routes' ? Object.entries(ROUTE).map((path) =>
				(<Link activeClassName="is-active" className="navLink" href={path[1].path}>
					<img src={path[1].iconUrl} /*alt={'icon' + path[1].path}*/ />
					<p>{path[0]}</p></Link>)
			) : props.render === 'userMenu' && <p>Hello</p>}
		</nav>
	</div>);
}
