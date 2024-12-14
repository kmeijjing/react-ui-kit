import SLoading from '../components/SLoading';

const Loading = () => {
	return (
		<div className='p-12'>
			<div className='font-bold'>loading</div>

			<SLoading />
			<SLoading type={2} />
		</div>
	);
};

export default Loading;
