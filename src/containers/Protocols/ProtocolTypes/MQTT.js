import './ProtocolTypes.less';
import {Button, Input, Switch, Select, Checkbox} from '../../../patterns';

const MQTT = () => (
	<div className="FormWrapper">
		<div className="title">MQTT</div>
		<form className="column">

			<div className="row">
				<Switch /> <p>Enable MQTT</p>
			</div>

			<div className="row alignMQTT">
				<p>MQTT mode</p> <Select class="select long" options={['Generic', 'MS Azure']}/>
			</div>

			<div className="row alignMQTT">
				<p>Broker Host</p> <Input class="formInput long" value="example.com"/>
			</div>

			<div className="row alignMQTT">
				<p>Broker Port </p> <Input class="formInput short" value="1883"/>
			</div>

			<div className="row">
				<Checkbox /> <p>Use credentials</p>
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
