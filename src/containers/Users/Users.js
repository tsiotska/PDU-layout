import './Users.less';
import { Link } from 'preact-router/match';
import { Button } from '../../patterns';

function Users() {
	return (
		<div className="UsersWrapper">
			<div className="panel">
				<div className="title">Users</div>
				<div className="nav">
					<Link href={'/users/admin'} activeClassName="is-active" className="tab">Admin</Link>
					<Link activeClassName="is-active" className="tab">Guest</Link>
					<div className="tabBtn"><Button class="middle disabled" value="Create user" /></div>
				</div>
			</div>


		</div>
	);
}

export default Users;
