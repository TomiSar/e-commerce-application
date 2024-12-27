import { useState } from 'react';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';

function App() {
  const routes = getRoutes();
  const [allRoutes] = useState([...publicRoutes, routes]);

  return <Router allRoutes={allRoutes} />;
}

export default App;
