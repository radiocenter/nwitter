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
		<div className='container'>
			<form onSubmit={onSubmit} className='profileForm'>
				<input
					onChange={onChange}
					type='text'
					placeholder='Display name'
					value={newDisplayName}
					autoFocus
					className='formInput'
				/>
				<input type='submit' value='Update Profile' className='formBtn' style={{ marginTop: 10 }} />
			</form>
			<span className='formBtn cancelBtn logOut' onClick={onLogOutClick}>
				Log Out
			</span>
		</div>
	);
};

export default Profile;
