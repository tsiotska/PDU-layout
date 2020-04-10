import {Component} from 'preact';
import {RadioButton, Switch, TextBox} from '../../patterns';
import Output from '../../assets/output.svg';

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
									<Output className="On" alt="output"/>
									<p>Output_1</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<Output className="On" alt="output"/>
									<p>Output_2</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<Output className="On" alt="output"/>
									<p>Output_3</p>
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
									<Output className="On" alt="output"/>
									<p>Output_4</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<Output className="Error" alt="output"/>
									<p>Output_5</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<Output className="Overload" alt="output"/>
									<p>Output_6</p>
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
									<Output className="Off" alt="output"/>
									<p>Output_7</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<Output className="Off" alt="output"/>
									<p>Output_8</p>
								</div>
								<div><Switch/></div>
								<div><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column">
									<Output className="Off" alt="output"/>
									<p>Output_9</p>
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
