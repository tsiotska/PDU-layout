import {Component} from 'preact';
import './Overview.less';
import {MockOutlets} from '../../constants';
import SystemLayout from './SystemLayout/SystemLayout';

//shouldn't i map it with mock??

export default class Overview extends Component {
	render() {
		return (
			<div className="OverviewWrapper">
				<div className="title">
					Outlets
				</div>

				<div className="table">
					{MockOutlets.data.map((outlet, outletInx) => (
						<div className="column">

							<div className="row">
								<div className="row">
									<div className="Box">{outletInx + 1}</div>
									<div className="column">
										<div className="label">Voltage</div>
										<div>{outlet.Phases.Voltage}</div>
									</div>

									<div className="column">
										<div className="label">Current</div>
										<div> {outlet.Phases.Current}</div>
									</div>
								</div>
							</div>

							<div className="row ">
								<div className="row">
									{outlet.Outputs.map((output, outputInx) => (
										<div className="column">
											<i className={'fas fa-charging-station fa-2x ' + output.State}/>
											<p>{'Output_' + outputInx}</p></div>
									))}
								</div>
							</div>

							<div className="row">
								{outlet.Outputs.map((output) => (
									<div className="column">
										{Object.entries(output).map((field) =>
											(<div className="label">
												<div className="field">
													{field[1]}
												</div>
											</div>))
										}
									</div>))}
							</div>

						</div>))}
				</div>

				<SystemLayout/>
			</div>
		);
	}
}
