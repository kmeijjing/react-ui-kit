import { Link, Outlet } from 'react-router-dom';
import packageJson from '../../package.json';
import { FaHouse } from 'react-icons/fa6';

const MainLayout = () => {
	return (
		<>
			<header className='flex h-50pxr items-center justify-between bg-primary px-16pxr text-white'>
				<div className='flex flex-nowrap items-center'>
					<button>
						<Link to='/'>
							<FaHouse className='mr-12pxr text-20pxr' />
						</Link>
					</button>
					<span className='text-16pxr'>{packageJson.name}</span>
				</div>
				<span className='mr-4pxr'>v{packageJson.version}</span>
			</header>
			<main className='p-20pxr'>
				<Outlet />
			</main>
		</>
	);
};

export default MainLayout;
