import {Component} from 'preact';
import {Link} from 'preact-router/match';
import {Network, Date, Firmware} from './Tabs';


export default class Settings extends Component {

	subRoutes = {
		Network: 'Network',
		Date: 'Date',
		Firmware: 'Firmware'
	};

	subComponents = {
		Network: <Network/>,
		Date: <Date/>,
		Firmware: <Firmware/>
	};

	get component() {
		const {page} = this.props;
		return page && page !== ':page' ? this.subComponents[page] : this.subComponents.Network;
	};

	render({page}) {

		return (
			<div className="SettingsWrapper">
				<div className="panel">
					<div className="title">Settings</div>

					<div className="nav">

						<Link href={`/settings/${this.subRoutes.Network}`} activeClassName="is-active" className="tab">
							Network Configuration
						</Link>

						<Link href={`/settings/${this.subRoutes.Date}`} activeClassName="is-active" className="tab">
							Date/Time
						</Link>

						<Link href={`/settings/${this.subRoutes.Firmware}`} activeClassName="is-active" className="tab">
							Firmware
						</Link>

					</div>
				</div>

				{this.component}

			</div>
		);
	}
}
