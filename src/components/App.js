import { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
	const auth = authService.getAuth();
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserObj({
					uid: user.uid,
					displayName: user.displayName,
				});
			} else {
				setUserObj(false);
			}
			setInit(true);
		});
	}, []);

	const refreshUser = () => {
		const user = auth.currentUser;
		setUserObj({
			user: user.uid,
			displayName: user.displayName,
		});
	};

	return (
		<>
			{init ? (
				<AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />
			) : (
				'initializing...'
			)}
		</>
	);
}

export default App;
