import { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faTintSlash } from '@fortawesome/free-solid-svg-icons';

const NweetFactory = ({ userObj }) => {
	const [nweet, setNweet] = useState('');
	const [attachment, setAttachment] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();
		if (nweet === '') {
			return;
		}

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
		if (Boolean(theFile)) {
			reader.readAsDataURL(theFile);
		}
	};

	const onClearAttachment = () => setAttachment('');

	return (
		<form onSubmit={onSubmit} className='factoryForm'>
			<div className='factoryInput__container'>
				<input
					className='factoryInput__input'
					value={nweet}
					onChange={onChange}
					type='text'
					placeholder="What's on your mind?"
					maxLength={120}
				/>
				<input type='submit' value='&rarr;' className='factoryInput__arrow' />
			</div>
			<label htmlFor='attach-file' className='factoryInput__label'>
				<span>Add photos</span>
				<FontAwesomeIcon icon={faPlus} />
			</label>
			<input
				id='attach-file'
				type='file'
				accept='image/*'
				onChange={onFilechange}
				style={{ opacity: 0 }}
			/>
			{attachment && (
				<div className='factoryForm__attachment'>
					<img src={attachment} style={{ backgroundImage: attachment }} alt='' />
					<div className='factoryForm__clear' onClick={onClearAttachment}>
						<span>Remove</span>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
			)}
		</form>
	);
};

export default NweetFactory;
