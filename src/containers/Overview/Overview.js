import {Component, h} from 'preact';
import {MockOutlets} from '../../constants';
import SystemLayout from './SystemLayout/SystemLayout';
import OutletOverview from './OutletOverview'
import Ground from '../../assets/ground.svg';

export default class Overview extends Component {
	render() {
		return (
			<div className="OverviewWrapper">
				<div className="title">
					Outlets
				</div>

				<div className="table">

					<div className="grid">

						{MockOutlets.data.map((outlet, i) => (
							<OutletOverview outlet={outlet} index={i}/>
						))}
					</div>

					<div className="groundContainer groundActive"> {/*Toggle groundActive and groundDisabled*/}
						<div className="iconContainer">
						<Ground className="icon"/>
						</div>
					</div>
				</div>

				<SystemLayout/>

			</div>

		);
	}
}
