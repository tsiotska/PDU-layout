import {Component} from 'preact';
import './Overview.less';
import {Outlets} from '../../constants/Outlets';

export default class Overview extends Component {
	render() {
		return (
			<div className="OverviewWrapper">
				<div className="title">
					Overview
				</div>

				<div className="table">
					{Outlets.data.map((outlet) => {
						return (<div className="column">
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
								{outlet.Outputs.map((output, index) => {
									return (
										<div className="column">
											<i className="fas fa-charging-station fa-2x"/>
											<p>{'Output_' + index}</p></div>
									);
								})}  </div>

							<div className="row">
								{outlet.Outputs.map((output) => (
									<div className="column">
										{Object.entries(output).map((field) => (<div className="field">
											{field[1]}
										</div>))
										}
									</div>))}
							</div>
						</div>);
					})}
				</div>
			</div>
		);
	}
}
