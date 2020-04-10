import { Button, Input, Select } from '../../../patterns';

function Date() {
	return (
		<div className="DateWrapper">
			<div className="title">Date/Time</div>

			<div className="column">
				<div className="inputGroup">
					<div className="row">
						<p className="label">
							NTP server address
						</p>
						<div>
							<Input class="formInput long" value="pool.ntp.org" />
						</div>
					</div>

					<div className="row">
						<p className="label">
							Timezone
						</p>
						<div>
							<Select class="long" options={['UTC-07:00 (MT) - Mountain Time zone']} />
						</div>
					</div>
				</div>

				<div className="row">
					<Button class="light small" value="Save Changes" />
				</div>
			</div>
		</div>
	);
}

export default Date;
