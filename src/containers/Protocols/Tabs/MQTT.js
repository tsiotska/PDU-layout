import {Button, Input, Switch, Select, Checkbox} from '../../../components';

const MQTT = () => (
	<div className="mqttWrapper">

		<div className="row head">
			<div className="title">MQTT</div>
		</div>

		<div className="column container">

			<div className="row switchContainer">
				<div><Switch/></div>
				<p className="label">Enable MQTT</p>
			</div>

			<div className="column inputContainer">
				<div className="row">
					<p className="label">MQTT mode</p>
					<div><Select class="select long" options={['Generic', 'MS Azure']}/></div>
				</div>

				<div className="row">
					<p className="label">Broker Host</p>
					<div><Input class="formInput long" value="example.com"/></div>
				</div>

				<div className="row">
					<p className="label">Broker Port </p>
					<div className="alignLeft"><Input class="formInput short" value="1883"/></div>
				</div>
			</div>

			<div className="row checkboxContainer">
				<div><Checkbox/></div>
				<p className="label">Use credentials</p>
			</div>

			<div className="column inputContainer">
				<div className="row">
					<p className="label">Username</p>
					<div><Input class="formInput long"/></div>
				</div>

				<div className="row">
					<p className="label">Password</p>
					<div><Input class="formInput long" type="password"/></div>
				</div>
			</div>

			<div className="column checkboxContainer">
				<div className="row">
					<div><Checkbox/></div>
					<p className="label">Use SSL</p>
				</div>

				<div className="row">
					<div><Checkbox/></div>
					<p className="label">Validate server's SSL certificate</p>
				</div>
			</div>

			<div className="inputContainer">
				<div className="row">
					<p className="label">Client Id</p>
					<div><Input class="formInput long" value="Example PDU"/></div>
				</div>
			</div>

			<div className="row buttonContainer">
				<Button class="small disabled" type="button" value="Save Changes"/>
			</div>
		</div>
	</div>
);

export default MQTT;
