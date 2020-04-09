import {Component} from 'preact';
import './Users.less';
import {Link} from 'preact-router/match';
import {Button} from '../../patterns';
import Admin from './Admin';

export default class Users extends Component {

	subRoutes = {
		Admin: 'Admin'
	};

	subComponents = {
		Admin: <Admin />
	};

	getComponent = (page) => page && page!==':page' ? this.subComponents[page] : this.subComponents.Admin;

	render({page}) {
		console.log(page);

		return (
			<div className="UsersWrapper">

				<div className="panel">
					<div className="title">Users</div>
					<div className="nav">
						<Link href={`/users/${this.subRoutes.Admin}`} activeClassName="is-active" className="tab">Admin</Link>
						<Link activeClassName="is-active" className="tab">
							Guest
							<i className="fas fa-times crossIcon"/>
						</Link>
						<div className="tabBtn"><Button class="middle disabled" value="Create user"/></div>
					</div>
				</div>

				{this.getComponent(page)}

			</div>
		);
	}
}
