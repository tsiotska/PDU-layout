import './ProtocolTypes.less';
import {Switch, Input, Button} from '../../../patterns';

const SNMPv2 = () => (
	<div className="FormWrapper">
		<div className="title">SNMPv2</div>
		<form className="column">

			<div className="row">
				<Switch /> <p>Enable SNMP Read</p>
			</div>

			<div className="row alignSNMP">
				<p>Read community</p> <Input class="formInput" value="Public" />
			</div>

			<div className="row">
				<Switch /> <p>Enable SNMP Write</p>
			</div>

			<div className="row alignSNMP">
				<p>Write community</p><Input class="formInput" value="Private" />
			</div>

			<div className="row">
				<Button class="button disabled" type="button" value="Save Changes" />
			</div>
		</form>
	</div>
);

export default SNMPv2;
