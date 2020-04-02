import { Component, render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
//import React from 'preact/compat';
import { Provider } from 'preact-redux';
import { Router } from 'preact-router';
import store from './store';

import './globalStyles/index.less';

import { ROUTE } from './constants/Routes';
import { Logs, Outlets, Overview, Protocols, Settings, Users } from './containers/pathes';
import { Header, Sidebar } from './elements/pathes';

//All used icons are temporary

class Main extends Component {
	state = { currentSidebar: 'routes' };

	toggleSidebar = (type) => {
		const { currentSidebar } = this.state;

		//dont waste your time. )
		const sidebar = document.getElementById('sidebar').classList;
		//Swiching if opened
		if (currentSidebar !== type && sidebar.value.includes('sidebarVisible')) {
			document.getElementById('hamburger').classList.toggle('fa-times');
			document.getElementById('userMenu').classList.toggle('fa-times');
		}
		else if (type === 'routes') {
			document.getElementById('hamburger').classList.toggle('fa-times');
			sidebar.toggle('sidebarVisible');
		}
		else {
			document.getElementById('userMenu').classList.toggle('fa-times');
			sidebar.toggle('sidebarVisible');
		}
		if (currentSidebar !== type)
			this.setState({ currentSidebar: type });
	};

	//idk why, but passing state in render doesn't work permanently
	render() {
		return (
			<div className="Wrapper">
				<Header toggleSidebar={this.toggleSidebar} />

				<div className="Components">
					<Sidebar render={this.state.currentSidebar} />
					<Provider store={store}>
						<Router>
							<Outlets path={ROUTE.Outlets.path} default />
							<Overview path={ROUTE.Overview.path} />
							<Protocols path={ROUTE.Protocols.path} />
							<Settings path={ROUTE.Settings.path} />
							<Users path={ROUTE.Users.path} />
							<Logs path={ROUTE.Logs.path} />
						</Router>
					</Provider>
				</div>
			</div>);
	}
}

render(<Main />, document.body);
