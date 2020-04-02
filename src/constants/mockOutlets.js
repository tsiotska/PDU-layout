const MockOutlets = {
	data: [
		{
			Phases: { Voltage: '220V', Current: '168A' },
			Outputs: [{
				State: 'On',
				Voltage: '220V',
				Current: '56A',
				ActivePower: '4.01kW'
			},
			{
				State: 'On',
				Voltage: '220V',
				Current: '56A',
				ActivePower: '4.01kW'
			},
			{
				State: 'On',
				Voltage: '220V',
				Current: '56A',
				ActivePower: '4.01kW'
			}]
		},
		{
			Phases: { Voltage: '220V', Current: '168A' },
			Outputs: [{
				State: 'On',
				Voltage: '220V',
				Current: '56A',
				ActivePower: '4.01kW'
			},
			{
				State: 'Error',
				Voltage: '220V',
				Current: '56A',
				ActivePower: '4.01kW'
			},
			{
				State: 'Overload',
				Voltage: '220V',
				Current: '56A',
				ActivePower: '4.01kW'
			}]
		},
		{
			Phases: { Voltage: '220V', Current: '168A' },
			Outputs: [{
				State: 'Off',
				Voltage: '220V',
				Current: '56A',
				ActivePower: '4.01kW'
			},
			{
				State: 'Off',
				Voltage: '220V',
				Current: '56A',
				ActivePower: '4.01kW'
			},
			{
				State: 'Off',
				Voltage: '220V',
				Current: '56A',
				ActivePower: '4.01kW'
			}]
		}]
};
export default MockOutlets;
