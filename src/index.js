import {Component, render, createRef} from 'preact';
import {Provider} from 'preact-redux';
import {Router} from 'preact-router';
import store from './store';

import './globalStyles/index.less';

import {ROUTE} from './constants';
import {Logs, Outlets, Overview, Protocols, Settings, Users, Auth, Profile, Languages} from './Components/containers';
import {Header, Sidebar} from './Components/elements';

import ResizeObserver from 'preact-resize-observer';


class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSidebarOpened: false,
			isUserMenuOpened: false,
			isItMobile: window.innerWidth <= 767,
			languages: ['English', 'Turkish', 'Ukrainian']
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
			})
			//Then from pc to mobile
		} else if (width <= 767 && !this.state.isItMobile) {
			this.setState({
				isItMobile: !this.state.isItMobile,
				isSidebarOpened: false,
			});
			//If sidebar was opened, let him be closed...
			if (this.sidebarRef.current.classList.value.includes('sidebarVisible')) {
				this.sidebarRef.current.classList.toggle('sidebarVisible');
			}
		}
	};

	toggleSidebar = () => {
		this.sidebarRef.current.classList.toggle('sidebarVisible');
		this.setState({isSidebarOpened: !this.state.isSidebarOpened})
	};

	toggleUserProfile = () => {
		this.setState({isUserMenuOpened: !this.state.isUserMenuOpened})
	};

	//Auth router must be outside of header and sidebar! Rrr
	render({}, {isSidebarOpened, isUserMenuOpened, isItMobile, languages}) {
		return (
			<ResizeObserver class="fluid-content" onResize={this.handleResize}>
				<div className="Wrapper">

					<Header isSidebarOpened={isSidebarOpened} isUserMenuOpened={isUserMenuOpened}
									toggleSidebar={this.toggleSidebar} toggleUserProfile={this.toggleUserProfile}
									languages={languages}/>

					<div className="Components">
						<Sidebar isItMobile={isItMobile} sidebarRef={this.sidebarRef} toggleSidebar={this.toggleSidebar}/>

						<div className="pageScroll">

							<div className="page">
								<Provider store={store}>
									<Router>
										<Auth path={ROUTE.LOGIN}/>
										<Profile path={ROUTE.PROFILE}/>
										<Languages languages={languages} path={ROUTE.LANGUAGES}/>
										<Outlets path={ROUTE.OUTLETS} default/>
										<Overview path={ROUTE.OVERVIEW}/>
										<Protocols path={ROUTE.PROTOCOLS}/>
										<Settings path={ROUTE.SETTINGS}/>
										<Users isItMobile={isItMobile} path={ROUTE.USERS}/>
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
