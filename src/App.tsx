import { useState } from 'react';
import './css/App.css';
import SDropdown from './components/SDropdown';
import SCheckbox from './components/SCheckbox';
import SButton from './components/SButton';
import SRadio from './components/SRadio';
import STabs from './components/STabs';
import STabPanel from './components/STabPanel';
import STag from './components/STag';

function App() {
	const [checked, setChecked] = useState<boolean>(false);
	function handleClick() {
		setChecked(!checked);
	}

	const items = [
		{ label: 'item1', value: 'item1', disabled: false },
		{ label: 'item2', value: 'item2', disabled: false },
		{ label: 'item3', value: 'item3', disabled: false },
	];
	const [selectedValue, setSelectedValue] = useState<string | number>('item3');

	const handleRadioChange = (model: string | number) => {
		setSelectedValue(model);
	};

	const [tabValue, setTabValue] = useState<string>('tab1');

	function handleTabChange(val: string) {
		console.log(val);
		setTabValue(val);
	}

	return (
		<>
			<main>
				<div className='p-4'>
					<STabs
						tabs={[
							{ label: 'tab1', value: 'tab1', badge: 'tab1' },
							{ label: 'tab2', value: 'tab2', badge: 'tab2' },
							{ label: 'tab3', value: 'tab3' },
							{ label: 'tab4', value: 'tab4' },
						]}
						model={tabValue}
						onChange={handleTabChange}
					>
						<STabPanel value='tab1'>
							<p>Tab 1 Content</p>
						</STabPanel>
						<STabPanel value='tab2'>
							<p>Tab 2 Content</p>
						</STabPanel>
						<STabPanel value='tab3'>
							<p>Tab 3 Content</p>
						</STabPanel>
						<STabPanel value='tab4'>
							<p>Tab 4 Content</p>
						</STabPanel>
					</STabs>
				</div>
				{selectedValue}
				<div className='flex flex-col'>
					{items.map((item) => (
						<SRadio
							key={item.value}
							name='item'
							label={item.label}
							value={item.value}
							disabled={item.disabled}
							model={selectedValue}
							className='mx-2 my-1'
							onChange={handleRadioChange}
						/>
					))}
				</div>
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

    <STag label='tag' color="grey" />
			</main>
		</>
	);
}

export default App;
