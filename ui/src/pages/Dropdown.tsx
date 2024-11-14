import SDropdown from '../components/SDropdown';

const Dropdown = () => {
	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Dropdown Button</b>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SDropdown
					options={[
						{ label: 'option 1', value: 1 },
						{ label: 'option 2', value: 2 },
					]}
					onClick={() => ''}
					size='xs'
					label='dropdown'
				/>
				<SDropdown
					options={[
						{ label: 'option 1', value: 1, disable: true },
						{ label: 'option 2', value: 2 },
					]}
					onClick={() => ''}
					size='sm'
					label='dropdown'
				/>
				<SDropdown
					options={[
						{ label: `<span style="color: red">option 1</span>`, value: 1 },
						{ label: 'option 2', value: 2, display: false },
					]}
					onClick={() => ''}
					size='md'
					label='dropdown'
				/>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SDropdown
					options={[
						{ label: 'option 1', value: 1 },
						{ label: 'option 2', value: 2 },
					]}
					onClick={() => ''}
					outline
					size='xs'
					label='dropdown'
				/>
				<SDropdown
					options={[
						{ label: 'option 1', value: 1, disable: true },
						{ label: 'option 2', value: 2 },
					]}
					onClick={() => ''}
					outline
					size='sm'
					label='dropdown'
				/>
				<SDropdown
					options={[
						{ label: `<span style="color: red">option 1</span>`, value: 1 },
						{ label: 'option 2', value: 2, display: false },
					]}
					onClick={() => ''}
					outline
					size='md'
					label='dropdown'
				/>
			</div>
			<div className='inline-flex items-center gap-8pxr'>
				<SDropdown
					options={[
						{ label: 'option 1', value: 1 },
						{ label: 'option 2', value: 2 },
					]}
					onClick={() => ''}
					disabled
					size='xs'
					label='dropdown'
				/>
				<SDropdown
					options={[
						{ label: 'option 1', value: 1, disable: true },
						{ label: 'option 2', value: 2 },
					]}
					onClick={() => ''}
					disabled
					size='sm'
					label='dropdown'
				/>
			</div>
		</div>
	);
};

export default Dropdown;
