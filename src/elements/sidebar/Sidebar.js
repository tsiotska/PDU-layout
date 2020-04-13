import {Link} from 'preact-router/match';
import {ROUTE} from '../../constants';
//import {Dropdown} from '../../patterns';

 const Sidebar = ({toggleSidebar, sidebarRef}) => {

	return (
		<div ref={sidebarRef} className="sidebar">
		<nav className="navList">
			<Link onClick={toggleSidebar} activeClassName="is-active" className="navLink" href={ROUTE.OVERVIEW}>
				<div className="contextContainer">
					<div className="iconContainer">
						<img className="icon" src="../../assets/dashboard-outlined.svg" alt="dashboard-outlined"/>
					</div>
					<p className="label">Overview</p>
				</div>
			</Link>

			<Link onClick={toggleSidebar} activeClassName="is-active" className="navLink" href={ROUTE.OUTLETS}>
				<div className="contextContainer">
					<div className="iconContainer">
						<img className="icon" src="../../assets/outlets.svg" alt="outlets"/>
					</div>
					<p className="label">Outlets</p></div>
			</Link>

			<Link onClick={toggleSidebar} activeClassName="is-active" className="navLink" href={ROUTE.PROTOCOLS}>
				<div className="contextContainer">
					<div className="iconContainer">
						<img className="icon" src="../../assets/api-outlined.svg" alt="api-outlined"/>
					</div>
					<p className="label">API Protocols</p></div>
			</Link>

			<Link onClick={toggleSidebar} activeClassName="is-active" className="navLink" href={ROUTE.LOGS}>
				<div className="contextContainer">
					<div className="iconContainer">
						<img className="icon" src="../../assets/document-text-outline.svg" alt="document-text-outline"/>
					</div>
					<p className="label">Logs</p></div>
			</Link>

			<Link onClick={toggleSidebar} activeClassName="is-active" className="navLink" href={ROUTE.USERS}>
				<div className="contextContainer">
					<div className="iconContainer">
						<img className="icon" src="../../assets/user-outlined.svg" alt="user-outlined"/>
					</div>
					<p className="label">Users</p></div>
			</Link>

			<Link onClick={toggleSidebar} activeClassName="is-active" className="navLink" href={ROUTE.SETTINGS}>
				<div className="contextContainer">
					<div className="iconContainer">
						<img className="icon" src="../../assets/settings.svg" alt="settings"/>
					</div>
					<p className="label">Settings</p></div>
			</Link>
		</nav>
	</div>)
};

export default Sidebar;
