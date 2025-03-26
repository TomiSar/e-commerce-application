import { useState, useEffect } from 'react';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from './store/Reducers/authReducer';

function App() {
  const routes = getRoutes();
  const [allRoutes] = useState([...publicRoutes, routes]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo());
    }
  }, [token, dispatch]);

  return <Router allRoutes={allRoutes} />;
}

export default App;
