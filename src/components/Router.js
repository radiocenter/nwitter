import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from './Navigation';
import Profile from 'routes/Profile';
import Layout from './Layout';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
	return (
		<Router>
			{isLoggedIn && <Navigation userObj={userObj} />}
			<Routes>
				{isLoggedIn ? (
					<Route element={<Layout />}>
						<Route exact path='/' element={<Home userObj={userObj} />} />
						<Route
							exact
							path='/profile'
							element={<Profile refreshUser={refreshUser} userObj={userObj} />}
						/>
					</Route>
				) : (
					<>
						<Route exact path='/' element={<Auth />} />
					</>
				)}
			</Routes>
		</Router>
	);
};

export default AppRouter;
