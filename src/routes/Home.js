import { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
	const [nweet, setNweet] = useState('');
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		dbService.onSnapshot((snapshot) => {
			const newArray = [];
			snapshot.forEach((doc) => {
				const nweetObj = { ...doc.data(), id: doc.id };
				newArray.push(nweetObj);
			});
			setNweets(newArray);
		});
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.insertDoc({
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
		});
		setNweet('');
	};

	const onChange = (event) => {
		event.preventDefault();
		const {
			target: { value },
		} = event;
		setNweet(value);
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					value={nweet}
					onChange={onChange}
					type='text'
					placeholder="What's on your mind?"
					maxLength={120}
				/>
				<input type='submit' value='Nweet' />
			</form>
			<div>
				{nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
				))}
			</div>
		</>
	);
};
export default Home;
