import './SNMP.less';
import { Switch, Input, Button } from '../../../patterns';

const SNMPv2 = () => (
	<div className="snmpWrapper">


		<div className="row">
			<div className="title">SNMPv2</div>
			<Button class="light" value="Download MIB file" />
		</div>

		<div className="column">
			<div className="row">
				<div><Switch /></div>
				<p className="label">Enable SNMP Read</p>
			</div>

			<div className="row">
				<p className="label">Read community</p>
				<div><Input class="formInput" value="Public" /></div>
			</div>

			<div className="row">
				<div><Switch /></div>
				<p className="label">Enable SNMP Write</p>
			</div>

			<div className="row">
				<p className="label">Write community</p>
				<div><Input class="formInput" value="Private" /></div>
			</div>

			<div className="row">
				<Button class="small disabled" type="button" value="Save Changes" />
			</div>
		</div>
	</div>

);

export default SNMPv2;
