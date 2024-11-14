import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainLayout from '../layouts/MainLayout';

const pages = import.meta.glob('/src/pages/**/*.tsx', { eager: true });

export const routes = Object.keys(pages).map((filePath) => {
	const name = filePath.replace('/src/pages', '').replace(/\.tsx$/, '');
	const path = name.toLocaleLowerCase();
	const Component = (pages[filePath] as any).default;
	return {
		name,
		path,
		element: <Component />,
	};
});

const Router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <App />,
			},
		].concat(routes),
	},
]);

export default Router;
