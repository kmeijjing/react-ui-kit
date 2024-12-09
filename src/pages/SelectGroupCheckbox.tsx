import { useState } from 'react';
import SSelectGroupCheckbox, {
	type Group,
} from '../components/SSelectGroupCheckbox';

const SelectGroupCheckbox = () => {
	const [selected, setSelected] = useState<(string | number)[]>([]);
	const groups: Group[] = [
		{
			id: 1,
			label: 'Group 1',
			options: [
				{ id: 1, label: 'Option 1-1' },
				{ id: 2, label: 'Option 1-2' },
			],
		},
		{
			id: 2,
			label: 'Group 2',
			options: [
				{ id: 3, label: 'Option 2-1' },
				{ id: 4, label: 'Option 2-2' },
			],
		},
	];
	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Select Group Checkbox</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SSelectGroupCheckbox
					options={groups}
					selected={selected}
					setSelected={setSelected}
				/>
			</div>
		</div>
	);
};

export default SelectGroupCheckbox;
