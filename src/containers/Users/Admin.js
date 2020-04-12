import { Button, Input, Switch } from '../../patterns';

function Admin() {
	return (
		<div className="AdminWrapper">
			<div className="title">
				User Settings
			</div>

			<div className="column container">

				<div className="inputGroup">
					<div className="row">
						<div className="label">
							<p>Username</p>
						</div>
						<div>
							<Input class="formInput middle" value="Admin" />
						</div>
					</div>

					<div className="row">
						<div className="label">
							<p>Password</p>
						</div>
						<div>
							<Input class="formInput middle" />
						</div>
					</div>

					<div className="row">
						<div className="label">
							<p>Confirm Password</p>
						</div>
						<div>
							<Input class=" formInput middle" />
						</div>
					</div>
				</div>

				<div className="switchGroup">
					<div className="row">
						<div>
							<Switch />
						</div>
						<div className="label">
							<p>Outlets configuration</p>
						</div>
					</div>

					<div className="row">
						<div>
							<Switch />
						</div>
						<div className="label">
							<p>API configuration</p>
						</div>
					</div>

					<div className="row">
						<div>
							<Switch />
						</div>
						<div className="label">
							<p>Manage users</p>
						</div>
					</div>

					<div className="row">
						<div>
							<Switch />
						</div>
						<div className="label">
							<p>Settings management</p>
						</div>
					</div>
				</div>

				<div className="row buttonContainer">
					<div><Button class="small disabled" value="Save Changes" /></div>
				</div>

			</div>
		</div>
	);
}

export default Admin;
