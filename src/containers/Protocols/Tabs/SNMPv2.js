import {Switch, Input, Button} from '../../../components';

const SNMPv2 = () => (
	<div className="snmpWrapper">

		<div className="row head">
			<div className="title">SNMPv2</div>
			<Button class="light" value="Download MIB file"/>
		</div>

		<div className="column container">

			<div className="column blockGroup">
				<div className="row">
					<div><Switch/></div>
					<p className="label">Enable SNMP Read</p>
				</div>

				<div className="row">
					<p className="label">Read community</p>
					<div><Input class="formInput" value="Public"/></div>
				</div>
			</div>

			<div className="column blockGroup">
				<div className="row">
					<div><Switch/></div>
					<p className="label">Enable SNMP Write</p>
				</div>

				<div className="row">
					<p className="label">Write community</p>
					<div><Input class="formInput" value="Private"/></div>
				</div>
			</div>

			<div className="row buttonContainer">
				<Button class="small disabled" type="button" value="Save Changes"/>
			</div>
		</div>
	</div>

);

export default SNMPv2;
