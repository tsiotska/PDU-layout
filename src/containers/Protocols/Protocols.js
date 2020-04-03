import {Component} from 'preact';
import './Protocols.less';
//import {SNMPv2, MQTT, REST} from '../index';
import {Link} from 'preact-router/match';
//import {Router, Route} from 'preact-router';

export default class Protocols extends Component {
	render() {
		return (
			<div className="ProtocolsWrapper">
				<div className="panel">
					<div className="title">API Protocols</div>
					<div className="nav">
						<Link href={'/protocols/SNMPv2'} activeClassName="is-active" className="tab">SNMPv2</Link>
						<Link href={'/protocols/MQTT'} activeClassName="is-active" className="tab">MQTT</Link>
						<Link href={'/protocols/REST'} activeClassName="is-active" className="tab">REST</Link>
					</div>
				</div>


			</div>
		);
	}
}

/*       <div>
					<Route  path='/SNMPv2' default component={SNMPv2}/>
					<Route path='/MQTT' component={MQTT}/>
				<Route path='/REST' component={REST}/>
			</div>

			or

			<Router>
					<SNMPv2 path='/SNMPv2' default/>
					<MQTT path='/MQTT'/>
					<REST path='/REST'/>
				</Router>
			*/
