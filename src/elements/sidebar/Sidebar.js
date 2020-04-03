import {Link} from 'preact-router/match';
import {ROUTE, SIDEBAR_TYPE} from '../../constants';
import './Sidebar.less';
import {Dropdown} from '../../patterns';

export default function Sidebar(props) {
	const closeSidebar = () => {
		props.sidebarRef.current.classList.remove('sidebarVisible');
	};
	//Very hardcoded as you asked -_-
	return (<div ref={props.sidebarRef} className="sidebar">

		{
			props.render === SIDEBAR_TYPE.ROUTES
				?
				<nav className="navList">
					<Link onClick={() => closeSidebar()} activeClassName="is-active" className="navLink" href={ROUTE.OVERVIEW}>
						<div className="contextHolder">
							/*<img src={'/'}  />*/
							<p>Overview</p>
						</div>
					</Link>

					<Link onClick={() => closeSidebar()} activeClassName="is-active" className="navLink" href={ROUTE.OUTLETS}>
						<div className="contextHolder">  /*<img src={'/'}  />*/
							<p>Outlets</p></div>
					</Link>

					<Link onClick={() => closeSidebar()} activeClassName="is-active" className="navLink" href={ROUTE.PROTOCOLS}>
						<div className="contextHolder">/*<img src={'/'}  />*/
							<p>API Protocols</p></div>
					</Link>

					<Link onClick={() => closeSidebar()} activeClassName="is-active" className="navLink" href={ROUTE.LOGS}>
						<div className="contextHolder">  /*<img src={'/'}  />*/
							<p>Logs</p></div>
					</Link>

					<Link onClick={() => closeSidebar()} activeClassName="is-active" className="navLink" href={ROUTE.USERS}>
						<div className="contextHolder">  /*<img src={'/'}  />*/
							<p>Users</p></div>
					</Link>

					<Link  onClick={() => closeSidebar()}activeClassName="is-active" className="navLink" href={ROUTE.SETTINGS}>
						<div className="contextHolder">  /*<img src={'/'}  />*/
							<p>Settings</p></div>
					</Link>
				</nav>
				: props.render === SIDEBAR_TYPE.USER_MENU
				&& <nav className="navList">

					<div className="navLink">
						<div className="contextHolder">
							<Dropdown
								iconUrl="fas fa-globe-americas fa-2x"
								name={'English'}
								list={[
									'English',
									'Spanish',
									'Denmark',
									'(^_^)',
									'Works fine'
								]}
							/></div>
					</div>


					<div className="navLink">
						<div className="contextHolder">
							<i className="far fa-user-circle fa-2x"/>
							<p> UserName </p></div>
					</div>

					<div className="navLink">
						<div className="contextHolder">
							<i className="fas fa-sign-out-alt fa-2x"/>
							<p> Sign Out</p>
						</div>
					</div>
				</nav>
		}

	</div>);
}

/*	Object.entries(ROUTE).map((path) => (
						<Link activeClassName="is-active" className="navLink" href={path[1].path}>
							<img src={path[1].iconUrl} alt={'icon' + path[1].path} />
<p>{path[0]}</p>
</Link>*/
