import styles from './signIn.module.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { authInstance } from "../../../firebase";

export default function() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function signIn(): void {
    signInWithEmailAndPassword(authInstance, email, password)
      .then(() => setError(''))
      .catch(err => {
        if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found'
          || err.code === 'auth/wrong-password' || password === '') {
          setError('E-mail or password is incorrect');
        } else if (err.code === 'auth/user-disabled') {
          setError('This user is suspended');
        } else {
          setError(err.code);
        }
        setPassword('');
      });
  }

  return (
    <div className={styles.box}>
      <form onSubmit={event => {
          event.preventDefault();
          signIn();
        }}>
        <input className={styles.email} type='text' placeholder='Email' value={email} onChange={event => setEmail(event.target.value)}></input>
        <input className={styles.password} type='password' placeholder='Password' value={password} onChange={event => setPassword(event.target.value)}></input>
        <div className={styles.belowFields}>
          <span>{ error }</span>
          <button className={styles.signInButton} type='submit'>Sign In</button>
        </div>
      </form>
      <span className={styles.signUp}>No account yet? <span className={styles.underlined} onClick={() => {}}>Sign up</span> instead</span>
      <span className={styles.forgot}><span className={styles.underlined} onClick={() => {}}>I forgot my password</span></span>
    </div>
  );
}