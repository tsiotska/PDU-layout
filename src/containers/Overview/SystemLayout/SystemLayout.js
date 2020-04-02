import './SystemLayout.less';

const SystemLayout = () => (<div className="systemDescription">
	<div className="title"> System</div>

	<div className="row container">
		<div className="column">
			<div className="heading">Temperature</div>
			<div className="value"> 63 C°</div>
		</div>

		<div className="column">
			<div className="heading">Current Network Status</div>
			<div className="row">
				<div className="label">MAC address</div>
				<div className="value">24:A4:2C:39:2E:D4</div>
			</div>
			<div className="row">
				<div className="label">IP address</div>
				<div className="value"> 31.7.241.131</div>
			</div>
			<div className="row">
				<div className="label">Net mask</div>
				<div className="value"> 255.255.255.240</div>
			</div>
			<div className="row">
				<div className="label">Default gateway</div>
				<div className="value"> 31.7.241.129</div>
			</div>
			<div className="row">
				<div className="label">DNS server</div>
				<div className="value"> 8.8.8.8</div>
			</div>
			<div className="row">
				<div className="label"> Network mode</div>
				<div className="value"> DHCP</div>
			</div>
		</div>

		<div className="column">
			<div className="heading">Hardware Version</div>
			<div className="row">
				<div className="label">Controller</div>
				<div className="value"> PDU9</div>
			</div>
			<div className="row">
				<div className="label">Peripherials
				</div>
				<div className="value">v00.001</div>
			</div>
			<div className="column">
				<div className="heading">Current Software Version</div>
				<div className="value"> PDUSOFT9</div>
			</div>
		</div>

		<div className="column">
			<div className="heading">Date / Time</div>
			<div className="row">
				<div className="label">Date</div>
				<div className="value">11.11.2020</div>
			</div>
			<div className="row">
				<div className="label">Time</div>
				<div className="column">
					<div className="value">10:10:10</div>
					<div className="value">UTC−07:00 (MT) — Mountain Time zone</div>
					<div className="value">(NTP not synced yet)</div>
				</div>
			</div>
		</div>

	</div>
</div>);

export default SystemLayout;
