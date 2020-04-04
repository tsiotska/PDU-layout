import {Component} from 'preact';
import './Outlets.less';
import {RadioButton, Switch, TextBox} from '../../patterns';

export default class Outlets extends Component {

	render(props, state) {
		return (
			<div className="OutletsWrapper">
				<div className="title">
					Outlets
				</div>

				<div className="row">
					<p>Restore mode</p>
				</div>

				<div className="container">

					<div className="row">
						<div className="column">
							<RadioButton label="Latching" name="state"/>
							<p className="description">
								Initially, both flip-flops are reset,
								and the Q output of the second flip-flop is high,
								so the 74HC03 pulls the EN line to ground
							</p>
						</div>
						<div className="column">
							<RadioButton label="Stay OFF" name="state"/>
							<p className="description">
								Initially, both flip-flops are reset,
								and the Q output of the second flip-flop is high,
								so the 74HC03 pulls the EN line to ground
							</p>
						</div>
						<div className="column">
							<RadioButton label="Delayed" name="state" />
							<p className="description">Initially, both flip-flops are reset,
								and the Q output of the second flip-flop is high,
								so the 74HC03 pulls the EN line to ground</p>
						</div>
					</div>

					<div className="row">

						<div className="column labels">
							<div className="label">
								Outputs
							</div>
							<div className="label">
								State
							</div>
							<div className="label">
								Delay, s (0-255)
							</div>
						</div>

						<div className="row">

							<div className="column labels">
								<div className="label">
									Outputs
								</div>
								<div className="label">
									State
								</div>
								<div className="label">
									Delay, s (0-255)
								</div>
							</div>

							<div className="column">
								<div className="column">
									<i className="fas fa-charging-station fa-2x On"/>
									<p>Output_1</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<i className="fas fa-charging-station fa-2x On"/>
									<p>Output_1</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<i className="fas fa-charging-station fa-2x On"/>
									<p>Output_1</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>
						</div>


						<div className="row">

							<div className="column labels">
								<div className="label">
									Outputs
								</div>
								<div className="label">
									State
								</div>
								<div className="label">
									Delay, s (0-255)
								</div>
							</div>

							<div className="column">
								<div className="column">
									<i className="fas fa-charging-station fa-2x On"/>
									<p>Output_1</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<i className="fas fa-charging-station fa-2x Error"/>
									<p>Output_1</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<i className="fas fa-charging-station fa-2x Overload"/>
									<p>Output_1</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>
						</div>


						<div className="row">

							<div className="column labels">
								<div className="label">
									Outputs
								</div>
								<div className="label">
									State
								</div>
								<div className="label">
									Delay, s (0-255)
								</div>
							</div>

							<div className="column">
								<div className="column">
									<i className="fas fa-charging-station fa-2x Off"/>
									<p>Output_1</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<i className="fas fa-charging-station fa-2x Off"/>
									<p>Output_1</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<i className="fas fa-charging-station fa-2x Off"/>
									<p>Output_1</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>
						</div>

					</div>
				</div>

			</div>
		);
	}
}
