import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Records from './Records';
import DenemeBasket from './CustomSide';
import Home from './Home';
import CustomSide from './CustomSide';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/record',
        element: <Records />,
      },
      {
        path: '/custom',
        element: <CustomSide />,
      },
    ],
  },
]);
