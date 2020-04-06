import { Component, render, createRef } from 'preact';
import { Provider } from 'preact-redux';
import { Router } from 'preact-router';
import store from './store';

import './globalStyles/index.less';

import { ROUTE, SIDEBAR_TYPE } from './constants';
import { Logs, Outlets, Overview, Protocols, Settings, Users, Auth } from './containers';
import { Header, Sidebar } from './elements';


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = { currentSidebar: SIDEBAR_TYPE.ROUTES };

	}

	routesRef = createRef();
	userMenuRef = createRef();
	sidebarRef = createRef();

	toggleSidebar = (event) => {
		const { currentSidebar } = this.state,
			sidebar = this.sidebarRef.current.classList,
			type = event.currentTarget.attributes.getNamedItem('name').value;


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

	//Please repair routers nesting
	render(_, { currentSidebar }) {
		return (
			<div className="Wrapper">

				<Header routesRef={this.routesRef} userMenuRef={this.userMenuRef} toggleSidebar={this.toggleSidebar} />

				<div className="Components">
					<Sidebar sidebarRef={this.sidebarRef} toggleSidebar={this.toggleSidebar} render={currentSidebar} />

					<div className="pageScroll">

						<div className="page">
							<Provider store={store}>
								<Router>
									<Auth path={ROUTE.LOGIN} />
									<Outlets path={ROUTE.OUTLETS} default />
									<Overview path={ROUTE.OVERVIEW} />
									<Protocols path={ROUTE.PROTOCOLS} />
									<Settings path={ROUTE.SETTINGS} />
									<Users path={ROUTE.USERS} />
									<Logs path={ROUTE.LOGS} />
								</Router>
							</Provider>
						</div>

					</div>
				</div>
			</div>);
	}
}

render(<Main />, document.body);
