import { Switch, Input, Button } from '../../../patterns';
import './Network.less';

function NetworkConfig() {
	return (
		<div className="NetworkWrapper">
			<div className="title">
				Network Configuration
			</div>

			<div className="column">
				<div className="column">
					<div className="inputGroup">
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

					<div className="switchGroup">
						<div className="row">
							<div><Switch /></div>
							<p className="label">Use DHCP</p>
						</div>

						<div className="row">
							<div><Switch /></div>
							<p className="label">Set static IP address</p>
						</div>
					</div>

					<div className="inputGroup">
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

					<div className="row">
						<div><Button class="small light" value="Save Changes" /></div>
					</div>
				</div>

				<div className="column">
					<div className="row">
						<div><Button class="light" value="locale" /></div>
						<div className="label">Blink with status LEDs for 1 minute.</div>
					</div>
					<div className="row">
						<p>Warning: Changes to network settings may result in PowerPDU 4C becoming unavailable at the current
							address. See the PowerPDU 4C User Manual for ways to find the PowerPDU 4C at its new address.</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NetworkConfig;
