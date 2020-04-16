import { Dropzone, Button } from '../../../Components/patterns';

function Firmware() {
	return (
		<div className="FirmwareWrapper">
			<div className="title">Firmware</div>

			<div className="column container">
				<div className="row">
					<p className="label">
						Firmware version
					</p>
					<div className="value">
						PDUSOFT9
					</div>
				</div>

				<div className="row">
					<div className="label">
						<p>Firmware package</p>
					</div>
					<div className="value Dropzone">
						<Dropzone />
					</div>
				</div>

				<div className="row buttonContainer">
					<Button class="light small" value="Install Firmware" />
				</div>

			</div>
		</div>
	);
}

export default Firmware;
