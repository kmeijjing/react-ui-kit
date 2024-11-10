import { useState } from 'react';
import SCheckbox from '../components/SCheckbox';
import SButton from '../components/SButton';

const Checkbox = () => {
	const [checked, setChecked] = useState(false);

	const handleClick = () => {
		setChecked(!checked);
	};

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Checkbox</b>
			</div>
			<div>
				<SButton
					onClick={handleClick}
					label='toggle button'
				/>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SCheckbox
					label='aaa'
					checked={checked}
					className='m-11'
				/>
				<SCheckbox
					label='aaa'
					className='m-11'
					checked={checked}
				/>
				<SCheckbox
					label='aaa'
					className='m-11'
					checked={checked}
					disabled
				/>
			</div>
		</div>
	);
};

export default Checkbox;
