import { sendPasswordResetEmail } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { RefObject, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authInstance, functionsInstance } from '../../firebase';
import styles from './forgotPassword.module.scss';

const forgotPassword = httpsCallable(functionsInstance, 'forgotPassword');

function isEmailValid(emailRef: RefObject<HTMLInputElement>): boolean {
  if (!emailRef.current?.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    emailRef.current?.setAttribute('class', styles.error);
    return false;
  } else {
    emailRef.current?.setAttribute('class', '');
    return true;
  }
}

export default function() {
  const [error, setError] = useState<string>('');
  
  const email = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function forgotPasswordOnClick(): void {

    //Validate the inputs (must have completed every fields and email must be valid, password & password confirm must be the same)
    let valid = true;
    if (!email.current?.value || !isEmailValid(email)) { 
      email.current?.setAttribute('class', styles.error); 
      valid = false;
    } else {
      email.current?.setAttribute('class', ''); 
    }
    if (!valid) {
      setError('Please enter a valid email adress');
      return;
    }

    sendPasswordResetEmail(authInstance, email.current?.value!)
      .then(() => {
        setError('');
        navigate(-1);
      }).catch(err => {
        if (err.code === 'auth/user-not-found') {
          setError('User not found');
        } else {
          setError(err.code);
        }
      });
  }

  return (
    <div className={styles.resetPassword}>
      <div className={styles.gradientCircle}></div>
      <div className={styles.box}>
        <h1>Reset your password</h1>
        <form onSubmit={event => {
          event.preventDefault();
          forgotPasswordOnClick();
        }}>
          <input type='text' placeholder='Email' ref={email} onChange={() => isEmailValid(email)} />
          <div className={styles.belowFields}>
            <span>{ error }</span>
            <button className={styles.resetButton} type='submit'>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}