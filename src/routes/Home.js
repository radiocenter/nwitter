import { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
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

	return (
		<div className='container'>
			<NweetFactory userObj={userObj} />
			<div style={{ marginTop: 30 }}>
				{nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
				))}
			</div>
		</div>
	);
};
export default Home;
