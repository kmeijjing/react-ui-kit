import React, { useState } from 'react';
import SSelect, { type Option } from '../components/SSelect';

const Select = () => {
	const options = [
		{ label: 'item1', value: 'item1', disabled: true },
		{ label: 'item2', value: 'item2', disabled: false },
		{
			label: 'item3item3item3item3item3item3item3item3',
			value: 'item3',
			disabled: false,
		},
	];
	const [selectedValue, setSelectedValue] = useState<Option>(options[0]);

	return (
		<div className='flex w-300pxr flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Select</b>
			</div>
			<SSelect
				options={options}
				value={selectedValue}
				label='label'
				onChange={(val) => setSelectedValue(val)}
				className='w-200pxr'
				disabled
			/>

			<SSelect
				options={options}
				value={selectedValue}
				label='label'
				onChange={(val) => setSelectedValue(val)}
				className='w-200pxr'
			/>

			<SSelect
				options={options}
				value={selectedValue}
				onChange={(val) => setSelectedValue(val)}
				className='w-100pxr'
			/>
		</div>
	);
};

export default Select;
