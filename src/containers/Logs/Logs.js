import { Component } from 'preact';
import { Button } from '../../patterns';
import './Logs.less';

export default class Logs extends Component {
	render() {
		return (
			<div className="LogsWrapper">

				<div className="row">
					<div className="title">Logs</div>
					<div className="row btnGroup">
						<Button value="Refresh" />
						<Button value="Export to file" />
						<Button value="Clear log" class="disabled" />
					</div>
				</div>


				<div className="column">
					<div className="row labels">
						<div>
							<div>Time</div>
							<div>Type</div>
						</div>

						<div>Message</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div>
							<div>2020-03-09 13:18:45</div>
							<div>NOTICE</div>
						</div>
						<div>Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>
				</div>
			</div>
		);
	}
}
