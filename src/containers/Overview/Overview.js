import {Component} from 'preact';
import './Overview.less';
import {MockOutlets} from '../../constants';
import SystemLayout from './SystemLayout/SystemLayout';
import Output from '../../assets/output.svg';

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
								<div className="label"> Phase</div>

								<div className="row">
									<div className="Box">{outletInx + 1}</div>

									<div className="row">
										<div className="column">
											<div className="label"> Voltage</div>
											<div>{outlet.Phases.Voltage}</div>
										</div>
										<div className="column">
											<div className="label"> Current</div>
											<div> {outlet.Phases.Current}</div>
										</div>
									</div>
								</div>
							</div>

							<div className="row ">
								<div className="label"> Output</div>
								<div className="row">
									{outlet.Outputs.map((output, outputInx) => (
										<div className="column">

											<div className="icon">
												<Output alt="output" className={output.State}/>
											</div>

											<p>{'Output_' + outputInx}</p></div>
									))}
								</div>
							</div>

							<div className="row">

								<div className="column">
									<div className="label"> State</div>
									<div className="label"> Voltage</div>
									<div className="label"> Current</div>
									<div className="label"> Active power</div>
								</div>

								<div className="row">
									{outlet.Outputs.map((output) => (
										<div className="column">
											{Object.entries(output).map((value) => (
												<div className={"value " + (value[0] === "State" ? value[1] : "")}>
													{value[1]}
												</div>
											))}
										</div>))}
								</div>

							</div>
						</div>
					))}
				</div>

				<SystemLayout/>

			</div>

		);
	}
}
