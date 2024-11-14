import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './routes/router';
import './css/index.css';
import React from 'react';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={Router} />
	</StrictMode>
);
