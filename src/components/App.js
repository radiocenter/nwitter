import { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
	const auth = authService.getAuth();
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(user);
				setUserObj(user);
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'initializing...'}
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
		</>
	);
}

export default App;
