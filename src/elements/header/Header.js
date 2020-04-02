//import { Component } from 'preact';
import './Header.less';
import logo from '../../assets/logo.png';
import {Dropdown} from '../../patterns/pathes';


const Header = (props) => (
	<div className="header">
		<i id="hamburger" className="fas fa-bars fa-2x" onClick={() => props.toggleSidebar('routes')}/>
		<div className="logoContainer">
			<img className="logo" src={logo} alt="logo"/>
		</div>

		<div className="rightSide">
			<Dropdown className="element" iconUrl="fas fa-globe-americas fa-2x" name={'English'}
								list={['English i am sooo stupittttttttttttt', 'Sorry', 'expansion', '(^_^)', 'Works fine']}
			/>

			<div className="element">
				<i className="far fa-user-circle fa-2x"/>
				<p> UserName </p>
			</div>

			<div className="element">
				<i className="fas fa-sign-out-alt fa-2x"/>
				<p> Sign Out</p>
			</div>
		</div>

		<i id="userMenu" className="fas fa-ellipsis-v fa-2x" onClick={() => props.toggleSidebar('userMenu')}/>

	</div>
);

export default Header;
