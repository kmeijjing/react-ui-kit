import { useState } from 'react';
import SRadio from '../components/SRadio';

const Radio = () => {
	const [selectedValue, setSelectedValue] = useState<string | number>('item3');

	const handleRadioChange = (model: string | number) => {
		setSelectedValue(model);
	};

	const items = [
		{ label: 'item1', value: 'item1', disabled: false },
		{ label: 'item2', value: 'item2', disabled: false },
		{ label: 'item3', value: 'item3', disabled: false },
	];

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Radio</b>
			</div>
			value : {selectedValue}
			<div className='inline-flex items-center gap-8pxr'>
				{items.map((item) => (
					<SRadio
						key={item.value}
						name='item'
						label={item.label}
						value={item.value}
						disabled={item.disabled}
						checked={selectedValue}
						className='mx-2 my-1'
						onChange={handleRadioChange}
					/>
				))}
			</div>
		</div>
	);
};

export default Radio;
