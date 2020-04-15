import {Component, createRef} from 'preact';
import {Link} from 'preact-router/match';
import {Button} from '../../../globalStyles/patterns';
import Cross from "../../../assets/round-close.svg";
import Admin from './Admin';

export default class Users extends Component {

	componentRef = createRef();
	panelRef = createRef();

	componentDidMount() {
		if (this.props.isItMobile) {
			this.componentRef.current.classList.toggle('is-hidden');
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.isItMobile && this.props.page !== ":page") {
			this.toggleMobilePanel();
		}
	}

	toggleMobilePanel = () => {
		this.panelRef.current.classList.toggle('is-hidden');
		this.componentRef.current.classList.toggle('is-hidden');
	};

	get component() {
		const {page, isItMobile} = this.props;
		//If we have a page and this is exact path so we render this path, otherwise if its desktop (only) we render Admin as default path
		return page && page !== ':page' ? this.subComponents[page] : !isItMobile && this.subComponents.Admin
	};

	subRoutes = {
		Admin: 'Admin'
	};

	subComponents = {
		Admin: <Admin turnBack={this.toggleMobilePanel}/>
	};

	render({page}) {

		return (
			<div className="UsersWrapper">

				<div ref={this.panelRef} className="panel">
					<div className="title">Users</div>
					<div className="nav">
						<Link href={`/users/${this.subRoutes.Admin}`} activeClassName="is-active" className="tab">Admin</Link>
						<Link activeClassName="is-active" className="tab">
							Guest
							<Cross className="crossIcon"/>
						</Link>
						<div className="tabBtn"><Button class="middle disabled" value="Create user"/></div>
					</div>
				</div>

				<div ref={this.componentRef} className="component">  {this.component} </div>
			</div>
		);
	}
}
