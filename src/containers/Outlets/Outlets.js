import {Component} from 'preact';
import {RadioButton, Switch, TextBox} from '../../Components/patterns';
import Output from '../../assets/output.svg';

export default class Outlets extends Component {
	state = {
		restoreModes: ["Latching", "Stay OFF", "Delayed"],
		selectedMode: "Latching"
	};

	toggleMode = (selected) => {
		console.log(selected)
		this.setState({selectedMode: selected});
	};

	render(props, {restoreModes, selectedMode}) {
		return (
			<div className="OutletsWrapper">

				<div className="title">
					<p> Outlets </p>
				</div>


				<div className="container">

					<div className="heading">
						<p>Restore mode</p>
					</div>

					<div className="row stateGroup">
						<div className={"column " + (selectedMode === restoreModes[0] ? "is-active" : "")}>
							<RadioButton callback={() => this.toggleMode(restoreModes[0])} label={restoreModes[0]} name="state"
													 checked={selectedMode === restoreModes[0]}/>
							<p className="description">
								Initially, both flip-flops are reset,
								and the Q output of the second flip-flop is high,
								so the 74HC03 pulls the EN line to ground
							</p>
						</div>
						<div className={"column " + (selectedMode === restoreModes[1] ? "is-active" : "")}>
							<RadioButton callback={() => this.toggleMode(restoreModes[1])} label={restoreModes[1]} name="state"
													 checked={selectedMode === restoreModes[1]}/>
							<p className="description">
								Initially, both flip-flops are reset,
								and the Q output of the second flip-flop is high,
								so the 74HC03 pulls the EN line to ground
							</p>
						</div>
						<div className={"column " + (selectedMode === restoreModes[2] ? "is-active" : "")}>
							<RadioButton callback={() => this.toggleMode(restoreModes[2])} label={restoreModes[2]} name="state"
													 checked={selectedMode === restoreModes[2]}/>
							<p className="description">Initially, both flip-flops are reset,
								and the Q output of the second flip-flop is high,
								so the 74HC03 pulls the EN line to ground</p>
						</div>
					</div>

					<div className="row stateGroupMobile">
						<div className="column">
							<div className="row states">
								<div className={"mode " + (selectedMode === restoreModes[0] ? "is-active" : "")}
										 onClick={() => this.toggleMode(restoreModes[0])}>
									<p className="label">
										{restoreModes[0]}
									</p>
								</div>

								<div className={"mode " + (selectedMode === restoreModes[1] ? "is-active" : "")}
										 onClick={() => this.toggleMode(restoreModes[1])}>
									<p className="label">
										{restoreModes[1]}
									</p>
								</div>

								<div className={"mode " + (selectedMode === restoreModes[2] ? "is-active" : "")}
										 onClick={() => this.toggleMode(restoreModes[2])}>
									<p className="label">
										{restoreModes[2]}
									</p>
								</div>
							</div>

							<div className="row descriptionWrapper">
								<div className={"descriptionContainer " + (selectedMode === restoreModes[0] ? "is-active" : "")}>
									<p className="description">
										Initially, both flip-flops are reset,
										and the Q output of the second flip-flop is high,
										so the 74HC03 pulls the EN line to ground
									</p>
								</div>
								<div className={"descriptionContainer " + (selectedMode === restoreModes[1] ? "is-active" : "")}>
									<p className="description">
										Initially, both flip-flops are reset,
										and the Q output of the second flip-flop is high,
										so the 74HC03 pulls the EN line to ground
									</p>
								</div>
								<div className={"descriptionContainer " + (selectedMode === restoreModes[2] ? "is-active" : "")}>
									<p className="description">
										Initially, both flip-flops are reset,
										and the Q output of the second flip-flop is high,
										so the 74HC03 pulls the EN line to ground
									</p>
								</div>
							</div>
						</div>
					</div>

					{/*Duplicated labels column, another for mobile. But can be complicated*/}
					<div className="row outputsGrid">
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
								<div className="column Output">
									<Output className="On" alt="output"/>
									<p className="outputName">Output_1</p>
								</div>
								<div className="Switch"><Switch/></div>
								<div className="TextBox"><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column Output">
									<Output className="On" alt="output"/>
									<p className="outputName">Output_2</p>
								</div>
								<div className="Switch"><Switch/></div>
								<div className="TextBox"><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column Output">
									<Output className="On" alt="output"/>
									<p className="outputName">Output_3</p>
								</div>
								<div className="Switch"><Switch/></div>
								<div className="TextBox"><TextBox value={110}/></div>
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
								<div className="column Output">
									<Output className="On" alt="output"/>
									<p className="outputName">Output_4</p>
								</div>
								<div className="Switch"><Switch/></div>
								<div className="TextBox"><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column Output">
									<Output className="Error" alt="output"/>
									<p className="outputName">Output_5</p>
								</div>
								<div className="Switch"><Switch/></div>
								<div className="TextBox"><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column Output">
									<Output className="Overload" alt="output"/>
									<p className="outputName">Output_6</p>
								</div>
								<div className="Switch"><Switch/></div>
								<div className="TextBox"><TextBox value={110}/></div>
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
								<div className="column Output">
									<Output className="Off" alt="output"/>
									<p className="outputName">Output_7</p>
								</div>
								<div className="Switch"><Switch/></div>
								<div className="TextBox"><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column Output">
									<Output className="Off" alt="output"/>
									<p className="outputName">Output_8</p>
								</div>
								<div className="Switch"><Switch/></div>
								<div className="TextBox"><TextBox value={110}/></div>
							</div>

							<div className="column">
								<div className="column Output">
									<Output className="Off" alt="output"/>
									<p className="outputName">Output_9</p>
								</div>
								<div className="Switch"><Switch/></div>
								<div className="TextBox"><TextBox value={110}/></div>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}
