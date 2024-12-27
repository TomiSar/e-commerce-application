import { useState } from 'react';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';

function App() {
  const routes = getRoutes();
  const [allRoutes] = useState([...publicRoutes, routes]);

  // useEffect(() => {
  //   const routes = getRoutes();
  //   setAllRoutes([...allRoutes, routes]);
  //   // console.log(routes);
  // }, [allRoutes]);

  return <Router allRoutes={allRoutes} />;
}

export default App;
