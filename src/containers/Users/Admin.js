import { Button, Input, Switch } from '../../patterns';

function Admin() {
	return (
		<div className="AdminWrapper">
			<div className="title">
				User Settings
			</div>

			<form className="column">

				<div className="row">
					<div><p>Username</p></div>
					<div><Input class=" formInput long" value="Admin" /></div>
				</div>

				<div className="row">
					<div><p>Password</p></div>
					<div><Input class=" formInput long" /></div>
				</div>

				<div className="row">
					<div><p>Confirm Password</p></div>
					<div><Input class=" formInput long" /></div>
				</div>

				<div className="row">
					<Switch /> <p>Outlets configuration</p>
				</div>

				<div className="row">
					<Switch /> <p>API configuration</p>
				</div>

				<div className="row">
					<Switch /> <p>Manage users</p>
				</div>

				<div className="row">
					<Switch /> <p>Settings management</p>
				</div>

				<div className="row">
					<Button class="small disabled" value="Save Changes" />
				</div>

			</form>
		</div>
	);
}

export default Admin;
