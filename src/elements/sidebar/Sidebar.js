import { Link } from 'preact-router/match';
import { ROUTE, SIDEBAR_TYPE } from '../../constants';
import './Sidebar.less';

export default function Sidebar(props) {
	
	return (<div ref={props.sidebarRef} className="sidebar">

		{
			props.render === SIDEBAR_TYPE.ROUTES
				?
				<nav className="navList">
					<Link activeClassName="is-active" className="navLink" href={ROUTE.OVERVIEW}>
						/*<img src={'/'}  />*/
						<p>Overview</p>
					</Link>

					<Link activeClassName="is-active" className="navLink" href={ROUTE.OUTLETS}>
						/*<img src={'/'}  />*/
						<p>Outlets</p>
					</Link>

					<Link activeClassName="is-active" className="navLink" href={ROUTE.PROTOCOLS}>
						/*<img src={'/'}  />*/
						<p>API Protocols</p>
					</Link>

					<Link activeClassName="is-active" className="navLink" href={ROUTE.LOGS}>
						/*<img src={'/'}  />*/
						<p>Logs</p>
					</Link>

					<Link activeClassName="is-active" className="navLink" href={ROUTE.USERS}>
						/*<img src={'/'}  />*/
						<p>Users</p>
					</Link>

					<Link activeClassName="is-active" className="navLink" href={ROUTE.SETTINGS}>
						/*<img src={'/'}  />*/
						<p>Settings</p>
					</Link>
				</nav>
				: props.render === SIDEBAR_TYPE.USER_MENU && <p>Hello</p>
		}

	</div>);
}

/*	Object.entries(ROUTE).map((path) => (
						<Link activeClassName="is-active" className="navLink" href={path[1].path}>
							<img src={path[1].iconUrl} alt={'icon' + path[1].path} />
<p>{path[0]}</p>
</Link>*/
