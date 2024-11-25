import React, { useState } from 'react';
import SSelectCheckbox, { type Option } from '../components/SSelectCheckbox';

const SelectCheckbox = () => {
	const options = [
		{ label: 'item1', value: 'item1', disable: true },
		{ label: 'item2', value: 'item2', disable: false },
		{ label: 'item4', value: 'item4', disable: false },
		{
			label: 'item3item3item3item3item3item3item3item3',
			value: 'item3',
			disable: false,
		},
	];
	const [selectedValues, setSelectedValues] = useState<Option[]>([options[0]]);

	return (
		<div className='flex w-200pxr flex-col gap-12pxr p-16pxr'>
			<div>
				<b>SelectChekbox</b>
			</div>
			<SSelectCheckbox
				options={options}
				value={selectedValues}
				label='label'
				onChange={(val) => setSelectedValues(val)}
				className='w-200pxr'
			/>
		</div>
	);
};

export default SelectCheckbox;
