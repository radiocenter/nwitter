import { authService, dbService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import Nweet from 'components/Nweet';
import { useEffect, useState } from 'react';

const Profile = ({ userObj }) => {
	const auth = authService.getAuth();
	const navigate = useNavigate();
	const [nweets, setNweets] = useState([]);

	const onLogOutClick = () => {
		authService.signOut(auth);
		navigate('/');
	};

	const getMyNweets = async () => {
		const newArray = await dbService.getDocsList(userObj.uid);
		console.log(newArray);
		setNweets(newArray);
	};

	useEffect(() => {
		getMyNweets();
	}, []);

	return (
		<>
			<button onClick={onLogOutClick}>Log Out</button>
			<div>
				{nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
				))}
			</div>
		</>
	);
};

export default Profile;
