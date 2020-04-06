import './MQTT.less';
import { Button, Input, Switch, Select, Checkbox } from '../../../patterns';

const MQTT = () => (
	<div className="mqttWrapper">
		<div className="title">MQTT</div>

		<div className="column">

			<div className="row">
				<div><Switch /></div>
				<p className="label">Enable MQTT</p>
			</div>

			<div className="inputGroup">
				<div className="row">
					<p className="label">MQTT mode</p>
					<div><Select class="select long" options={['Generic', 'MS Azure']} /></div>
				</div>

				<div className="row">
					<p className="label">Broker Host</p>
					<div><Input class="formInput long" value="example.com" /></div>
				</div>

				<div className="row">
					<p className="label">Broker Port </p>
					<div className="alignLeft"><Input class="formInput short" value="1883" /></div>
				</div>
			</div>

			<div className="row">
				<div><Checkbox /></div>
				<p className="label">Use credentials</p>
			</div>

			<div className="inputGroup">
				<div className="row">
					<p className="label">Username</p>
					<div><Input class="formInput long" /></div>
				</div>

				<div className="row">
					<p className="label">Password</p>
					<div><Input class="formInput long" type="password" /></div>
				</div>
			</div>

			<div className="row">
				<div><Checkbox /></div>
				<p className="label">Use SSL</p>
			</div>

			<div className="row">
				<div><Checkbox /></div>
				<p className="label">Validate server's SSL certificate</p>
			</div>

			<div className="inputGroup">
				<div className="row">
					<p className="label">Client Id</p>
					<div><Input class="select long" value="Example PDU" /></div>
				</div>
			</div>

			<div className="row">
				<Button class="small disabled" type="button" value="Save Changes" />
			</div>
		</div>
	</div>
);

export default MQTT;
