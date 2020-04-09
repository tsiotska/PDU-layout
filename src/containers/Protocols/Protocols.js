import { Component } from 'preact';
import './Protocols.less';
import { SNMPv2, MQTT, REST } from './Tabs';
import { Link } from 'preact-router/match';


export default class Protocols extends Component {

	subRoutes = {
		SNMPv2: 'SNMPv2',
		MQTT: 'MQTT',
		REST: 'REST'
	};

	subComponents = {
		SNMPv2: <SNMPv2 />,
		MQTT: <MQTT />,
		REST: <REST />
	};

	getComponent = (page) => page ? this.subComponents[page] : this.subComponents.SNMPv2;

	render({ page }) {
		console.log(page);

		return (
			<div className="ProtocolsWrapper">
				<div className="panel">
					<div className="title">API Protocols</div>
					<div className="nav">
						<Link href={`/protocols/${this.subRoutes.SNMPv2}`} activeClassName="is-active" className="tab">SNMPv2</Link>
						<Link href={`/protocols/${this.subRoutes.MQTT}`} activeClassName="is-active" className="tab">MQTT</Link>
						<Link href={`/protocols/${this.subRoutes.REST}`} activeClassName="is-active" className="tab">REST</Link>
					</div>
				</div>

				{this.getComponent(page)}

			</div>);
	}
}
