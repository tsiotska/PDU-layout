import { RadioButton, Input, Button } from '../../../Components/patterns';

function NetworkConfig() {
	return (
		<div className="NetworkWrapper">
			<div className="title">
				Network Configuration
			</div>

			<div className="column container">

				<div className="column form">

					<div className="inputContainer">
						<div className="row">
							<p className="label">MAC address</p>
							<div className="value">24:A4:2C:39:2E:D4</div>
						</div>

						<div className="row">
							<p className="label">Hostname</p>
							<div>
								<Input class="formInput long" value="My PDU v0.01" />
							</div>
						</div>
					</div>

					<div className="column radioContainer">
						<div className="row">
							<p><RadioButton label="Use DHCP" name="adresses"/></p>
						</div>

						<div className="row">
							<p><RadioButton label="Set static IP address" name="adresses"/></p>
						</div>
					</div>

					<div className="inputContainer nested">
						<div className="row"><p className="label">IP address</p>
							<div><Input class="formInput long" value="31.7.241.131" /></div>
						</div>

						<div className="row">
							<p className="label">Net mask</p>
							<div><Input class="formInput long" value="255.255.255.240" /></div>
						</div>

						<div className="row">
							<p className="label">Default gateway</p>
							<div><Input class="formInput long" value="31.7.241.129" /></div>
						</div>

						<div className="row">
							<p className="label">DNS server</p>
							<div><Input class="formInput long" value="8.8.8.8" /></div>
						</div>
					</div>

					<div className="row buttonContainer">
						<div><Button class="small light" value="Save Changes" /></div>
					</div>
				</div>

				<div className="column footer">
					<div className="row">
						<div><Button class="light" value="locale" /></div>
						<div className="label">Blink with status LEDs for 1 minute.</div>
					</div>
					<div className="row warning">
						<p><b>Warning</b>: Changes to network settings may result in PowerPDU 4C becoming unavailable at the current
							address. See the PowerPDU 4C User Manual for ways to find the PowerPDU 4C at its new address.</p>
					</div>
				</div>

			</div>
		</div>
	);
}

export default NetworkConfig;
