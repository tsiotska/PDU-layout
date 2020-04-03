import './Header.less';
import logo from '../../assets/logo.png';
import { Dropdown } from '../../patterns';


const Header = (props) => (
	<div className="header">
		<i className="hamburger fas fa-bars fa-2x" ref={props.routesRef} onClick={() => props.toggleSidebar('routes')} />
		<div className="logoContainer">
			<img className="logo" src={logo} alt="logo" />
		</div>

		<div className="userMenu">
			<div className="element">
				<Dropdown
					iconUrl="fas fa-globe-americas fa-2x"
					name={'English'}
					list={[
						'English ',
						'.....................................',
						'Sorry',
						'(^_^)',
						'Works fine'
					]}
				/></div>

			<div className="element">
				<i className="far fa-user-circle fa-2x" />
				<p> UserName </p>
			</div>

			<div className="element">
				<i className="fas fa-sign-out-alt fa-2x" />
				<p> Sign Out</p>
			</div>
		</div>

		<i className="hamburger fas fa-ellipsis-v fa-2x" ref={props.userMenuRef} onClick={() => props.toggleSidebar('user_menu')} />

	</div>
);

export default Header;
