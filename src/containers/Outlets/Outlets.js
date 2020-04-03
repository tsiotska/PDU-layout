import {Component} from 'preact';
import './Outlets.less';
import {RadioButton} from '../../patterns';

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
					<div className="row underscore">
						<div className="column">
							<RadioButton label="Latching" name="state" />
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
							<RadioButton label="Delayed" name="state"/>
							<p>Initially, both flip-flops are reset,
								and the Q output of the second flip-flop is high,
								so the 74HC03 pulls the EN line to ground</p>
						</div>
					</div>


					<div className="row">

					</div>
				</div>

			</div>
		);
	}
}
