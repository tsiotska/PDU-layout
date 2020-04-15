import {Link} from "preact-router/match";
import {ROUTE} from "../../../constants";
import {Button, Input} from "../../../globalStyles/patterns";
import SignOut from '../../../assets/bx-log-out-circle.svg';

const Profile = () => (
	<div className="profileWrapper">

		<div className="row head">
			<div className="title">
				Profile Settings
			</div>

			<div className="signOut">
				<Link className="row route" href={ROUTE.LOGIN}>
					<div className="iconContainer">
						<SignOut className="icon"/>
					</div>
					<p className="label"> Sign Out</p>
				</Link>
			</div>
		</div>

		<div className="column container">

			<div className="inputContainer">
				<div className="row">
					<div className="label">
						<p>Username</p>
					</div>
					<div>
						<Input class="formInput middle"/>
					</div>
				</div>
			</div>

			<div className="row label"><p>Change password</p></div>

			<div className="inputContainer">
				<div className="row">
					<div className="label">
						<p>New password</p>
					</div>
					<div>
						<Input class="formInput middle"/>
					</div>
				</div>

				<div className="row">
					<div className="label">
						<p>Confirm password</p>
					</div>
					<div>
						<Input class="formInput middle"/>
					</div>
				</div>
			</div>


			<div className="row buttonContainer">
				<div><Button class="small disabled" value="Save Changes"/></div>
			</div>

		</div>
	</div>
);

export default Profile;
