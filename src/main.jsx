import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import ContextProvider from './Context.jsx';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes.jsx';

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={routes} />
  </ContextProvider>
);
