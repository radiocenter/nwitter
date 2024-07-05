import { dbService, storageService } from 'fbase';
import { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);

	const onDeleteClick = () => {
		const ok = window.confirm('삭제하시겠습니까?');
		if (ok) {
			dbService.deleteDoc(nweetObj.id);
			if (nweetObj.attachmentUrl !== '') {
				const imageRef = storageService.ref(storageService.storage, nweetObj.attachmentUrl);
				storageService.deleteObject(imageRef);
			}
		}
	};

	const toggleEditing = () => setEditing((prev) => !prev);

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewNweet(value);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		dbService.updateDoc(nweetObj.id, newNweet);
		setEditing(false);
	};

	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input onChange={onChange} value={newNweet} required />
						<input type='submit' value='Update Nweet' />
					</form>
					<button onClick={toggleEditing}>Cancel</button>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{nweetObj.attachmentUrl && (
						<img src={nweetObj.attachmentUrl} width='50px' height='50px' />
					)}
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete Nweet</button>
							<button onClick={toggleEditing}>Edit Nweet</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
