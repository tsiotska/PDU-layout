import { Component } from 'preact';
import './Overview.less';
import { MockOutlets } from '../../constants';

export default class Overview extends Component {
	render() {
		return (
			<div className="OverviewWrapper">
				<div className="title">
					Overview
				</div>

				<div className="table">
					{MockOutlets.data.map((outlet) => (<div className="column">
						<div className="row">
							<div className="column">
								<p>Voltage</p>
								<p>{outlet.Phases.Voltage}</p>
							</div>
							<div className="column">
								<p>Current</p>
								<p>  {outlet.Phases.Current}</p>
							</div>
						</div>

						<div className="row">
							{outlet.Outputs.map((output, index) => (
								<div className="column">
									<i className="fas fa-charging-station fa-2x" />
									<p>{'Output_' + index}</p></div>
							))}  </div>

						<div className="row">
							{outlet.Outputs.map((output) => (
								<div className="column">
									{Object.entries(output).map((field) => (<div className="field">
										{field[1]}
									</div>))
									}
								</div>))}
						</div>
					</div>))}
				</div>
			</div>
		);
	}
}
