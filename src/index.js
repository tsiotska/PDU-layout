import {Component, render, createRef} from 'preact';
import {Provider} from 'preact-redux';
import {Router} from 'preact-router';
import store from './store';

import './globalStyles/index.less';

import {ROUTE, SIDEBAR_TYPE} from './constants';
import {Logs, Outlets, Overview, Protocols, Settings, Users, Auth, Profile} from './containers';
import {Header, Sidebar} from './elements';

import ResizeObserver from 'preact-resize-observer';


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSidebar: SIDEBAR_TYPE.ROUTES,
			closeRoutes: false,
			closeUserMenu: false,
			isItMobile: window.innerWidth <= 767
		};
	}

	sidebarRef = createRef();

	/*This feature fixes simple adaptive issues,
	it was in sidebar, but then i thought it could be helpful for you*/

	handleResize = (width) => {
		//If we go from mobile to pc.
		if (width > 767 && this.state.isItMobile) {
			this.setState({
				isItMobile: !this.state.isItMobile,
				currentSidebar: SIDEBAR_TYPE.ROUTES
			})
				//Then from pc to mobile
		} else if (width <= 767 && !this.state.isItMobile) {
			this.setState({
				isItMobile: !this.state.isItMobile,
				closeRoutes: false,
				closeUserMenu: false,
			});
			//If sidebar was opened, let him be closed...
			if (this.sidebarRef.current.classList.value.includes('sidebarVisible')) {
				this.sidebarRef.current.classList.toggle('sidebarVisible');
			}
		}
	};

	toggleSidebar = (event) => {
		const {currentSidebar, closeRoutes, closeUserMenu} = this.state,
			sidebar = this.sidebarRef.current.classList,
			type = event.currentTarget.attributes.getNamedItem('name').value;

		if (currentSidebar !== type && sidebar.value.includes('sidebarVisible')) {
			this.setState({closeRoutes: !closeRoutes, closeUserMenu: !closeUserMenu});
		} else if (type === 'routes') {
			this.setState({closeRoutes: !closeRoutes});
			sidebar.toggle('sidebarVisible');
		} else {
			this.setState({closeUserMenu: !closeUserMenu});
			sidebar.toggle('sidebarVisible');
		}
		if (currentSidebar !== type)
			this.setState({currentSidebar: type});
	};

	//Auth router must be outside of header and sidebar! Rrr
	render({}, {currentSidebar, closeRoutes, closeUserMenu, isItMobile}) {
		return (
			<ResizeObserver class="fluid-content" onResize={this.handleResize}>
				<div className="Wrapper">

					<Header isItMobile={isItMobile} closeRoutes={closeRoutes}
									closeUserMenu={closeUserMenu} toggleSidebar={this.toggleSidebar}/>

					<div className="Components">
						<Sidebar isItMobile={isItMobile} sidebarRef={this.sidebarRef} toggleSidebar={this.toggleSidebar}
										 render={currentSidebar}/>

						<div className="pageScroll">

							<div className="page">
								<Provider store={store}>
									<Router>
										<Auth path={ROUTE.LOGIN}/>
										<Profile path={ROUTE.PROFILE}/>
										<Outlets path={ROUTE.OUTLETS} default/>
										<Overview path={ROUTE.OVERVIEW}/>
										<Protocols path={ROUTE.PROTOCOLS}/>
										<Settings path={ROUTE.SETTINGS}/>
										<Users path={ROUTE.USERS}/>
										<Logs path={ROUTE.LOGS}/>
									</Router>
								</Provider>
							</div>

						</div>
					</div>
				</div>
			</ResizeObserver>
		)
	}
}

render(<Main/>, document.body);
