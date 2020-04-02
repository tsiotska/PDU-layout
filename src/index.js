import { Component, render, createRef } from 'preact';
import { Provider } from 'preact-redux';
import { Router } from 'preact-router';
import store from './store';

import './globalStyles/index.less';

import { ROUTE, SIDEBAR_TYPE } from './constants';
import { Logs, Outlets, Overview, Protocols, Settings, Users } from './containers';
import { Header, Sidebar } from './elements';


class Main extends Component {

	constructor(props) {
		super(props);
		this.state = { currentSidebar: SIDEBAR_TYPE.ROUTES };

	}

	routesRef = createRef();
	userMenuRef = createRef();
	sidebarRef = createRef();

	toggleSidebar = (type) => {
		const { currentSidebar } = this.state;

		const sidebar = this.sidebarRef.current.classList;

		if (currentSidebar !== type && sidebar.value.includes('sidebarVisible')) {
			this.routesRef.current.classList.toggle('fa-times');
			this.userMenuRef.current.classList.toggle('fa-times');
		}
		else if (type === 'routes') {
			this.routesRef.current.classList.toggle('fa-times');
			sidebar.toggle('sidebarVisible');
		}
		else {
			this.userMenuRef.current.classList.toggle('fa-times');
			sidebar.toggle('sidebarVisible');
		}
		if (currentSidebar !== type)
			this.setState({ currentSidebar: type });
	};

	//idk why, but passing state in render doesn't work permanently
	render(_, {currentSidebar}) {
		return (
			<div className="Wrapper">
				<Header routesRef={this.routesRef} userMenuRef={this.userMenuRef} toggleSidebar={this.toggleSidebar} />

				<div className="Components">
					<Sidebar sidebarRef={this.sidebarRef} render={currentSidebar} />
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
			</div>);
	}
}

render(<Main />, document.body);
