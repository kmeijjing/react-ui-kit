import { useState } from 'react';
import './css/App.css';
import SDropdown from './components/SDropdown';
import SCheckbox from './components/SCheckbox';
import SButton from './components/SButton';

function App() {
	const [checked, setChecked] = useState<boolean>(false);
	function handleClick() {
		setChecked(!checked);
	}
	return (
		<>
			<main>
				<SButton
					type='button'
					onClick={handleClick}
					className='bg-positive'
     label='toggle button'
				/>
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
				<SDropdown
					options={[
						{ label: 'option 1', value: 1 },
						{ label: 'option 2', value: 2 },
					]}
					onClick={() => ''}
					label='dropdown'
					className='m-11'
				/>
				<SDropdown
					options={[
						{ label: 'option 1', value: 1, disable: true },
						{ label: 'option 2', value: 2 },
					]}
					onClick={() => ''}
					label='dropdown'
					className='m-11'
				/>
				<SDropdown
					options={[
						{ label: `<span style="color: red">option 1</span>`, value: 1 },
						{ label: 'option 2', value: 2, display: false },
					]}
					onClick={() => ''}
					label='dropdown'
					className='m-11'
				/>
			</main>
		</>
	);
}

export default App;
