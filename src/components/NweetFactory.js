import { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
	const [nweet, setNweet] = useState('');
	const [attachment, setAttachment] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();

		let attachmentUrl = '';
		// upload image
		if (attachment !== '') {
			const attachmentRef = storageService.ref(
				storageService.storage,
				`${userObj.uid}/${uuidv4()}`,
			);
			const snapshot = await storageService.uploadString(attachmentRef, attachment, 'data_url');
			attachmentUrl = await storageService.getDownloadURL(snapshot.ref);
			//console.log(attachmentUrl);
		}

		await dbService.insertDoc({
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl,
		});
		setNweet('');
		setAttachment('');
	};

	const onChange = (event) => {
		event.preventDefault();
		const {
			target: { value },
		} = event;
		setNweet(value);
	};

	const onFilechange = (event) => {
		const {
			target: { files },
		} = event;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent;
			setAttachment(result);
		};
		reader.readAsDataURL(theFile);
	};

	const onClearAttachment = () => setAttachment('');

	return (
		<form onSubmit={onSubmit}>
			<input
				value={nweet}
				onChange={onChange}
				type='text'
				placeholder="What's on your mind?"
				maxLength={120}
			/>
			<input type='file' accept='image/*' onChange={onFilechange} />
			<input type='submit' value='Nweet' />
			{attachment && (
				<div>
					<img src={attachment} width='50px' height='50px' alt='' />
					<button onClick={onClearAttachment}>Clear</button>
				</div>
			)}
		</form>
	);
};

export default NweetFactory;
