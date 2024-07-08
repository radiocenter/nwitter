import { dbService, storageService } from 'fbase';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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
		<div className='nweet'>
			{editing ? (
				<>
					<form onSubmit={onSubmit} className='container nweetEdit'>
						<input
							onChange={onChange}
							value={newNweet}
							required
							placeholder='Edit your nweet'
							autoFocus
							className='formInput'
						/>
						<input type='submit' value='Update Nweet' className='formBtn' />
					</form>
					<button onClick={toggleEditing} className='formBtn cancelBtn'>
						Cancel
					</button>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{nweetObj.attachmentUrl && (
						<img src={nweetObj.attachmentUrl} width='50px' height='50px' alt='' />
					)}
					{isOwner && (
						<div className='nweet__actions'>
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} />
							</span>
							<span onClick={toggleEditing}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
