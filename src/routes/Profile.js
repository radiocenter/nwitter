import { authService, dbService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Profile = ({ userObj, refreshUser }) => {
	const auth = authService.getAuth();
	const navigate = useNavigate();
	const [newDisplayName, setNewDisplayName] = useState(
		userObj.displayName ? userObj.displayName : '',
	);

	const onLogOutClick = () => {
		authService.signOut(auth);
		navigate('/');
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewDisplayName(value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			await authService.updateProfile(auth.currentUser, { displayName: newDisplayName });
			refreshUser();
		}
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} type='text' placeholder='Display name' value={newDisplayName} />
				<input type='submit' value='Update Profile' />
			</form>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};

export default Profile;
