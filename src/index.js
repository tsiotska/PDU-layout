import { h, render, Component } from 'preact';
import { Provider } from 'preact-redux';
import { Router } from 'preact-router';
import store from './store';
import './globalStyles';
import Logs from './containers/Logs';
import { ROUTE } from './constants/Routes';
import Outlets from './containers/Outlets/Outlets';
import Overview from './containers/Overview/Overview';
import Protocols from './containers/Protocols/Protocols';
import Settings from './containers/Settings/Settings';
import Users from './containers/Users/Users';

const Main = () => (
	<div id="outer">
		<Provider store={store}>
			<Router>
				<Outlets path={ROUTE.OUTLETS} default />
				<Overview path={ROUTE.OVERVIEW} />
				<Protocols path={ROUTE.PROTOCOLS} />
				<Settings path={ROUTE.SETTINGS} />
				<Users path={ROUTE.USERS} />
				<Logs path={ROUTE.LOGS} />
			</Router>
		</Provider>
	</div>
);

render(<Main />, document.body);
