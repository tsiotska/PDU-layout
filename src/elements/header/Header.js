import './Header.less';
import logo from '../../assets/logo.png';
import { Dropdown } from '../../patterns';
import { Link } from 'preact-router/match';
import { ROUTE } from '../../constants';

const Header = (props) => (
	<div className="header">
		<i className="hamburger fas fa-bars fa-2x" ref={props.routesRef} name="routes" onClick={props.toggleSidebar} />

		<div className="logoContainer">
			<img className="logo" src={logo} alt="logo" />
		</div>

		<div className="userMenu">

			<div className="element">
				<Dropdown
					iconUrl="fas fa-globe-americas fa-2x"
					name={'English'}
					list={[
						'English', 'Turkish', 'Ukrainian', 'Ukrainian', 'Ukrainian', 'Ukrainian',
						'Ukrainian', 'Ukrainian',	'Ukrainian',	'Ukrainian',	'Ukrainian',	'Ukrainian'
					]}
				/></div>

			<div className="element">
				<i className="far fa-user-circle fa-2x" />
				<p> UserName </p>
			</div>

			<Link className="element" href={ROUTE.LOGIN}>
				<i className="fas fa-sign-out-alt fa-2x" />
				<p> Sign Out</p>
			</Link>
		</div>

		<i className="hamburger fas fa-ellipsis-v fa-2x" ref={props.userMenuRef} name="user_menu" onClick={props.toggleSidebar} />

	</div>
);

export default Header;
