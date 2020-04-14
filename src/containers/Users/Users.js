import {Component} from 'preact';
import {Link} from 'preact-router/match';
import {Button} from '../../patterns';
import Admin from './Admin';

export default class Users extends Component {
	state = {isPanelFullScreen: this.props.isItMobile && this.props.page && this.props.page === ':page'};

	turnBack = () => {
		this.setState({isPanelFullScreen: true})
		window.location.pathname = ":page"; //Придумай тут шось.
	};

	componentDidUpdate(prevProps, prevState) {
		const {page, isItMobile} = this.props;

		console.log(prevProps.page)
		console.log(this.props.page)
		console.log(prevProps.page !== this.props.page)

		//if route is selected, then close panel
		if (prevProps.page !== this.props.page && isItMobile && page && page !== ':page') {
			this.setState({isPanelFullScreen: false})
		}
	}

	get component() {
		const {page, isItMobile} = this.props;
		//If we have a page and this is exact path so we render this path, otherwise if its desktop (only) we render Admin as default path
		return page && page !== ':page' ? this.subComponents[page] : !isItMobile && this.subComponents.Admin
	};

	subRoutes = {
		Admin: 'Admin'
	};

	subComponents = {
		Admin: <Admin turnBack={this.turnBack}/>
	};

	render({page, isItMobile}, {isPanelFullScreen}) {

		return (
			<div className="UsersWrapper">

				{(isPanelFullScreen || !isItMobile) &&
				<div className="panel">
					<div className="title">Users</div>
					<div className="nav">
						<Link href={`/users/${this.subRoutes.Admin}`} activeClassName="is-active" className="tab">Admin</Link>
						<Link activeClassName="is-active" className="tab">
							Guest
							<img src="../../assets/round-close.svg" className="crossIcon" alt="close"/>
						</Link>
						<div className="tabBtn"><Button class="middle disabled" value="Create user"/></div>
					</div>
				</div>}

				{!isPanelFullScreen && this.component}
			</div>
		);
	}
}
