import STag from '../components/STag';

const Tag = () => {
	return (
		<div className='flex flex-col gap-12pxr p-16pxr'>
			<div>
				<b>Tag</b>
			</div>

			<div className='inline-flex items-center gap-8pxr'>
				<STag
					label='grey'
					color='grey'
				/>
				<STag
					label='red'
					color='red'
				/>
				<STag
					label='orange'
					color='orange'
				/>
				<STag
					label='yellow'
					color='yellow'
				/>
				<STag
					label='green'
					color='green'
					size='sm'
				/>
				<STag
					label='blue'
					color='blue'
					size='sm'
				/>
				<STag
					label='darkblue'
					color='darkblue'
					size='sm'
				/>
				<STag
					label='indigo'
					color='indigo'
					size='sm'
					textClass='font-bold'
				/>
			</div>
		</div>
	);
};

export default Tag;
