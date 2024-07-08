import { useState } from 'react';
import { authService } from 'fbase';

const AuthForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState('');

	const auth = authService.getAuth();

	const onChange = (event) => {
		const {
			target: { name, value },
		} = event;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			let data;

			if (newAccount) {
				// create newAccount
				data = await authService.createUserWithEmailAndPassword(auth, email, password);
			} else {
				// log in
				data = await authService.signInWithEmailAndPassword(auth, email, password);
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const toggleAccount = () => setNewAccount((prev) => !prev);

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					name='email'
					type='email'
					placeholder='Email'
					required={true}
					value={email}
					onChange={onChange}
				/>
				<input
					name='password'
					type='password'
					placeholder='Password'
					required={true}
					value={password}
					onChange={onChange}
				/>
				<input type='submit' value={newAccount ? 'Create Account' : 'Log in'} />
				{error}
			</form>
			<span onClick={toggleAccount}>{newAccount ? 'Sign in' : 'Create Account '}</span>
		</>
	);
};
export default AuthForm;
