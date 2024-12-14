import SProgress from '../components/SProgress';

const Progess = () => {
	return (
		<div className='p-12'>
			<div className='font-bold'>Progess</div>

			<SProgress />
			<SProgress percent={20} />
			<SProgress
				state='error'
				percent={48}
				label='Progess Error'
			/>
			<SProgress
				state='success'
				percent={100}
			/>
		</div>
	);
};

export default Progess;
