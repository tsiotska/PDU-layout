import './Firmware.less';
import { Dropzone, Button } from '../../../patterns';

function Firmware() {
	return (
		<div className="FirmwareWrapper">
			<div className="title">Firmware</div>

			<div className="column">
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
						<p>Firmware version</p>
					</div>
					<div className="value">
						<Dropzone />
					</div>
				</div>

				<div className="row">
					<Button class="light small" value="Install Firmware" />
				</div>

			</div>
		</div>
	);
}

export default Firmware;
