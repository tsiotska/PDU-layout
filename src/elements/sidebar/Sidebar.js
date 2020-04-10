import {Link} from 'preact-router/match';
import {ROUTE, SIDEBAR_TYPE} from '../../constants';
import {Dropdown} from '../../patterns';

export default function Sidebar(props) {
	const {toggleSidebar, sidebarRef, isItMobile} = props;
	return (<div ref={sidebarRef} className="sidebar">

		{props.render === SIDEBAR_TYPE.USER_MENU && isItMobile ?
			<nav className="navList">
				<div className="navLink">
					<div className="contextContainer">
						<Dropdown
							iconUrl="../../assets/earth-outline.svg"
							name="English"
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
					<div className="contextContainer">
						<div className="iconContainer">
							<img className="icon" src="../../assets/user-outlined.svg" alt="user-outlined"/>
						</div>
						<p className="label"> UserName </p></div>
				</div>

				<Link className="navLink" href={ROUTE.LOGIN}>
					<div className="contextContainer">
						<div className="iconContainer">
							<img className="icon" src="../../assets/bx-log-out-circle.svg" alt="user-outlined"/>
						</div>
						<p className="label"> Sign Out</p>
					</div>
				</Link>
			</nav>
			: props.render === SIDEBAR_TYPE.ROUTES &&
			<nav className="navList">
				<Link onClick={toggleSidebar} name={SIDEBAR_TYPE.ROUTES} activeClassName="is-active" className="navLink"
							href={ROUTE.OVERVIEW}>
					<div className="contextContainer">
						<div className="iconContainer">
							<img className="icon" src="../../assets/dashboard-outlined.svg" alt="dashboard-outlined"/>
						</div>
						<p className="label">Overview</p>
					</div>
				</Link>

				<Link onClick={toggleSidebar} name={SIDEBAR_TYPE.ROUTES} activeClassName="is-active" className="navLink"
							href={ROUTE.OUTLETS}>
					<div className="contextContainer">
						<div className="iconContainer">
							<img className="icon" src="../../assets/outlets.svg" alt="outlets"/>
						</div>
						<p className="label">Outlets</p></div>
				</Link>

				<Link onClick={toggleSidebar} name={SIDEBAR_TYPE.ROUTES} activeClassName="is-active" className="navLink"
							href={ROUTE.PROTOCOLS}>
					<div className="contextContainer">
						<div className="iconContainer">
							<img className="icon" src="../../assets/api-outlined.svg" alt="api-outlined"/>
						</div>
						<p className="label">API Protocols</p></div>
				</Link>

				<Link onClick={toggleSidebar} name={SIDEBAR_TYPE.ROUTES} activeClassName="is-active" className="navLink"
							href={ROUTE.LOGS}>
					<div className="contextContainer">
						<div className="iconContainer">
							<img className="icon" src="../../assets/document-text-outline.svg" alt="document-text-outline"/>
						</div>
						<p className="label">Logs</p></div>
				</Link>

				<Link onClick={toggleSidebar} name={SIDEBAR_TYPE.ROUTES} activeClassName="is-active" className="navLink"
							href={ROUTE.USERS}>
					<div className="contextContainer">
						<div className="iconContainer">
							<img className="icon" src="../../assets/user-outlined.svg" alt="user-outlined"/>
						</div>
						<p className="label">Users</p></div>
				</Link>

				<Link onClick={toggleSidebar} name={SIDEBAR_TYPE.ROUTES} activeClassName="is-active" className="navLink"
							href={ROUTE.SETTINGS}>
					<div className="contextContainer">
						<div className="iconContainer">
							<img className="icon" src="../../assets/settings.svg" alt="settings"/>
						</div>
						<p className="label">Settings</p></div>
				</Link>
			</nav>
		}
	</div>)
}

