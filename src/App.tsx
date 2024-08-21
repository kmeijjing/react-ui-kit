import './css/App.css';
import SDropdown from './components/SDropdown';
import SCheckbox from './components/SCheckbox';

function App() {
	let checkedValue = true;
	return (
		<>
			<main>
				{checkedValue ? 'checked' : 'unchecked'}
				<SCheckbox
					label='aaa'
					checked
					disabled
					className='m-11'
				/>
				<SCheckbox
					label='aaa'
					className='m-11'
					checked={checkedValue}
					disabled
				/>
				<SCheckbox
					label='aaa'
					className='m-11'
					checked={false}
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
