import './ProtocolTypes.less';
import {Button, Input, Switch, Select, Checkbox} from '../../../patterns';

const MQTT = () => (
	<div className="FormWrapper">
		<div className="title">MQTT</div>
		<form className="column">

			<div className="row">
				<div>	<Switch /></div> <div><p>Enable MQTT</p></div>
			</div>

			<div className="row alignMQTT">
				<div><p>MQTT mode</p></div> <div><Select class="select long" options={['Generic', 'MS Azure']}/></div>
			</div>

			<div className="row alignMQTT">
				<div>	<p>Broker Host</p> </div> <div><Input class="formInput long" value="example.com"/> </div>
			</div>

			<div className="row alignMQTT">
				<div>	<p>Broker Port </p></div> <div><Input class="formInput short" value="1883"/></div>
			</div>

			<div className="row">
				<div>	<Checkbox /></div> <div><p>Use credentials</p></div>
			</div>

			<div className="row alignMQTT">
				<p>Username</p> <Input class="formInput long" />
			</div>

			<div className="row alignMQTT">
				<p>Password</p> <Input class="formInput long" type="password" />
			</div>

			<div className="row">
				<Button class="button disabled" type="button" value="Save Changes" />
			</div>
		</form>
	</div>
);

export default MQTT;
