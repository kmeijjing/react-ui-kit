import { useState } from 'react';
import SToggle from '../components/SToggle';

const Toogle = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Toggle</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SToggle
					value={toggle}
					onChange={setToggle}
					disabled
					label='label'
				/>
				<SToggle
					type='button'
					buttonLabel='toggle'
					value={toggle}
					onChange={setToggle}
					disabled
					label='label'
				/>
			</div>
		</div>
	);
};

export default Toogle;
