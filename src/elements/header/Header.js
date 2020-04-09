import './Header.less';
import { Dropdown } from '../../patterns';
import { Link } from 'preact-router/match';
import { ROUTE } from '../../constants';

const Header = (props) => (
	<div className="header">
		<i className="hamburger fas fa-bars fa-2x" ref={props.routesRef} name="routes" onClick={props.toggleSidebar} />

		<div className="logoContainer">
			<img className="logo" src="../../assets/logo.png" alt="logo" />
		</div>

		<div className="userMenu">

			<div className="element">
				<Dropdown
					iconUrl="../../assets/earth-outline.svg"
					name="English"
					list={[
						'English', 'Turkish', 'Ukrainian', 'Ukrainian', 'Ukrainian', 'Ukrainian',
						'Ukrainian', 'Ukrainian', 'Ukrainian', 'Ukrainian', 'Ukrainian', 'Ukrainian'
					]}
				/></div>

			<div className="element">
				<img className="icon" src="../../assets/user-outlined.svg" alt="user-outlined"  />
				<p className="label"> UserName </p>
			</div>

			<Link className="element" href={ROUTE.LOGIN}>
				<img className="icon" src="../../assets/bx-log-out-circle.svg" alt="user-outlined"  />
				<p className="label"> Sign Out</p>
			</Link>
		</div>

		<i className="hamburger fas fa-ellipsis-v fa-2x" ref={props.userMenuRef} name="user_menu" onClick={props.toggleSidebar} />

	</div>
);

export default Header;
