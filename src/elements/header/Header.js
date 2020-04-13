import {Dropdown} from '../../patterns';
import {Link} from 'preact-router/match';
import {ROUTE} from '../../constants';

const Header = (props) => (
	<div className="header">

		<div className={"hamburger iconContainer " + (props.closeRoutes ? "cross" : "")} name="routes"
				 onClick={props.toggleSidebar}>
			<img src={props.closeRoutes ? "../../assets/round-close.svg" : "../../assets/round-menu.svg"}
					 className="icon" alt="hamburger"/>
		</div>

		<div className="logoContainer">
			<img src="../../assets/logo.png" className="logo" alt="logo"/>
		</div>

		<div className="userMenu">

			<div className="element">
				<Dropdown
					iconUrl="../../assets/earth-outline.svg"
					list={['English', 'Turkish', 'Ukrainian',]}
				/></div>

			<Link className="element" href={ROUTE.PROFILE}>
				<div className="iconContainer">
					<img className="icon" src="../../assets/outline-account-circle.svg" alt="user-outlined"/>
				</div>
				<p className="label"> UserName </p>
			</Link>

			<Link className="element" href={ROUTE.LOGIN}>
				<div className="iconContainer">
					<img className="icon" src="../../assets/bx-log-out-circle.svg" alt="user-outlined"/>
				</div>
				<p className="label"> Sign Out</p>
			</Link>
		</div>

		<div className={"hamburger iconContainer " + (props.closeUserMenu ? "cross" : "")} name="user_menu" onClick={props.toggleSidebar}>
			<img src={props.closeUserMenu ? "../../assets/round-close.svg" : "../../assets/more-vertical.svg"}
					 className="icon" alt="hamburger"/>
		</div>
	</div>
);

export default Header;
