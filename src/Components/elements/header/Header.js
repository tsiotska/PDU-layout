import {Dropdown} from '../../../globalStyles/patterns';
import {Link} from 'preact-router/match';
import {ROUTE} from '../../../constants';
import Hamburger from '../../../assets/round-menu.svg';
import UserIcon from '../../../assets/outline-account-circle.svg';
import Cross from '../../../assets/round-close.svg';

const Header = ({isSidebarOpened, isUserMenuOpened, toggleSidebar, toggleUserProfile, languages}) => (
	<div className="header">

		<div className={"hamburger iconContainer " + (isSidebarOpened ? "cross" : "")} onClick={toggleSidebar}>
			{isSidebarOpened ? <Cross className="icon"/> : <Hamburger className="icon"/>}
		</div>

		<div className="logoContainer">
			<img src="../../../assets/logo.png" className="logo" alt="logo"/>
		</div>

		<div className="userMenu">

			<div className="element">
				<Dropdown
					iconUrl="../../assets/earth-outline.svg"
					list={languages}/>
			</div>

			<Link className="element" href={ROUTE.PROFILE}>
				<div className="iconContainer">
					<img className="icon" src="../../../assets/outline-account-circle.svg" alt="user-outlined"/>
				</div>
				<p className="label"> UserName </p>
			</Link>

			<Link className="element" href={ROUTE.LOGIN}>
				<div className="iconContainer">
					<img className="icon" src="../../../assets/bx-log-out-circle.svg" alt="user-outlined"/>
				</div>
				<p className="label"> Sign Out</p>
			</Link>
		</div>

		<div className={"hamburger iconContainer " + (isUserMenuOpened ? "cross" : "")} name="user_menu">
			{isUserMenuOpened ? <Cross onClick={toggleUserProfile}  className="icon"/> :
				<Link onClick={toggleUserProfile}  href={ROUTE.PROFILE}><UserIcon className="icon"/></Link>}
		</div>
	</div>
);

export default Header;
