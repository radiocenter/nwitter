import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
	const auth = authService.getAuth();

	const onSocialClick = async (event) => {
		const {
			target: { name },
		} = event;
		let provider;
		if (name === 'google') {
			provider = new firebaseInstance.auth.GoogleAuthProvider();
		} else if (name === 'github') {
			provider = new firebaseInstance.auth.GithubAuthProvider();
		}
		const data = await authService.signInWithPopup(auth, provider);
	};

	return (
		<div className='authContainer'>
			<FontAwesomeIcon icon={faTwitter} color={'#04aaff'} size='3x' style={{ marginBottom: 30 }} />
			<AuthForm />

			<div className='authBtns'>
				<button onClick={onSocialClick} name='google' className='authBtn'>
					Continue with Google <FontAwesomeIcon icon={faGoogle} />
				</button>
				<button onClick={onSocialClick} name='github'>
					Continue with Github <FontAwesomeIcon icon={faGithub} />
				</button>
			</div>
		</div>
	);
};
export default Auth;
