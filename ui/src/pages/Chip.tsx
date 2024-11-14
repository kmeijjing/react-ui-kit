import { useState } from 'react';
import SChip from '../components/SChip';

const Chip = () => {
	const [inputValue, setInputValue] = useState('chip');

	const handleInput = (val: string) => {
		setInputValue(val);
	};

	const chipItems = [
		{ label: 'item1', value: true },
		{ label: 'item2', value: true },
		{ label: 'item3', value: true },
		{ label: 'item4', value: true },
	];

	return (
		<div className='p-12'>
			<div className='font-bold'>chip</div>
			<SChip value={true}>chip</SChip>
			<SChip
				value={true}
				rounded
			>
				rounded chip
			</SChip>

			{inputValue}
			<SChip
				value={true}
				removable
				useInput
				inputValue={inputValue}
				onInput={handleInput}
			/>

			<div className='flex flex-nowrap gap-12pxr'>
				{chipItems.map((item) => (
					<SChip
						key={item.label}
						value={item.value}
						removable
					>
						{item.label}
					</SChip>
				))}
			</div>
		</div>
	);
};

export default Chip;
