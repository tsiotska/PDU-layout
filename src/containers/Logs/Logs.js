import {Component} from 'preact';
import {Button} from '../../components';

export default class Logs extends Component {
	render() {
		return (
			<div className="LogsWrapper">

				<div className="row head">
					<div className="title">Logs</div>
					<div className="row btnGroup">
						<Button value="Refresh"/>
						<Button value="Export to file"/>
						<Button value="Clear log" class="disabled"/>
					</div>
				</div>

				<div className="column container">
					<div className="row labels">
						<div className="fieldMerger">
							<div className="label">Time</div>
							<div className="label">Type</div>
						</div>
						<div className="label">Message</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>

					<div className="row">
						<div className="fieldMerger">
							<div className="value">2020-03-09 13:18:45</div>
							<div className="value">NOTICE</div>
						</div>
						<div className="value message">Session for user 'demo' has been terminated (reason: timeout).</div>
					</div>
				</div>
			</div>
		);
	}
}
