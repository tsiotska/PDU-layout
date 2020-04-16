import Output from '../../assets/output.svg';

const OutletOverview = ({outlet, index}) => (
	<div className="column outletContainer">

		<div className="row phaseContainer">
			<div className="label"> Phase</div>

			<div className="row underscore">
				<div className="Box">{index + 1}</div>

				<div className="row labelsBlock">
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

		{/*Duplicated row below, bacause of easier aligning label to icon*/}
		<div className="row outputContainer">
			<div className="label"> Output</div>
			<div className="row">
				{
					outlet.Outputs.map((output, i) => (
						<div className="column">

							<div className="icon">
								<Output alt="output" className={output.State}/>
							</div>

							<p>{'Output_' + i}</p></div>
					))
				}
			</div>
		</div>


		<div className="row dataContainer">

			<div className="column labelContainer">
				<div className="label"> State</div>
				<div className="label"> Voltage</div>
				<div className="label"> Current</div>
				<div className="label"> Active power</div>
			</div>

			<div className="row">
				{
					outlet.Outputs.map((output) => (
						<div className="column">
							{Object.entries(output).map((value) => (
								<div className={"value " + (value[0] === "State" ? value[1] : "")}>
									{value[1]}
								</div>
							))}
						</div>))
				}
			</div>
		</div>
	</div>
);

export default OutletOverview;
