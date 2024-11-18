import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './routes/router';
import './css/index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider
			router={Router}
			future={{
				v7_startTransition: true,
			}}
		/>
	</StrictMode>
);