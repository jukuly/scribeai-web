import { User } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { RefObject, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { functionsInstance } from '../../firebase';
import styles from './signUp.module.scss';

const newUser = httpsCallable(functionsInstance, 'newUser');

function isEmailValid(emailRef: RefObject<HTMLInputElement>): boolean {
  if (!emailRef.current?.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    emailRef.current?.setAttribute('class', styles.error);
    return false;
  } else {
    emailRef.current?.setAttribute('class', '');
    return true;
  }
}

function isPasswordValid(passwordRef: RefObject<HTMLInputElement>): boolean {

  //length: 8-16, normal & capital letter, number and symbol: [!, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, ^, _, `, {, |, }, ~] 
  if (!passwordRef.current?.value.match(/^(?=.*[0-9])(?=.*[!"#$%&'()*+\,\-\./:;<=>?@^_`{|}~])[a-zA-Z0-9!"#$%&'()*+\,\-\./:;<=>?@^_`{|}~]{8,16}$/)) {
    passwordRef.current?.setAttribute('class', styles.error);
    return false;
  } else {
    passwordRef.current?.setAttribute('class', '');
    return true;
  }
}

function isPasswordConfirmValid(passwordRef: RefObject<HTMLInputElement>, passwordConfirmRef: RefObject<HTMLInputElement>): boolean {
  if (passwordConfirmRef.current?.value !== passwordRef.current!.value) {
    passwordConfirmRef.current?.setAttribute('class', styles.error);
    return false;
  } else {
    passwordConfirmRef.current?.setAttribute('class', '');
    return true;
  }
}

export default function({ user }: { user: User | null }) {
  const [error, setError] = useState<string>('');

  const name = useRef<HTMLInputElement>(null);
  const lastName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirm = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function signUp(): void {

    //Validate the inputs (must have completed every fields and email must be valid, password & password confirm must be the same)
    let valid = true;
    if (!name.current?.value) {
      name.current?.setAttribute('class', `${styles.name} ${styles.error}`); 
      valid = false;
    } else {
      name.current?.setAttribute('class', styles.name); 
    }
    if (!lastName.current?.value) { 
      lastName.current?.setAttribute('class', `${styles.lastName} ${styles.error}`); 
      valid = false;
    } else {
      lastName.current?.setAttribute('class', styles.lastName); 
    }
    if (!email.current?.value || !isEmailValid(email)) { 
      email.current?.setAttribute('class', styles.error); 
      valid = false;
    } else {
      email.current?.setAttribute('class', ''); 
    }
    if (!password.current?.value || !isPasswordValid(password)) { 
      password.current?.setAttribute('class', styles.error); 
      valid = false;
    } else {
      password.current?.setAttribute('class', ''); 
    }
    if (!passwordConfirm.current?.value || !isPasswordConfirmValid(password, passwordConfirm)) { 
      passwordConfirm.current?.setAttribute('class', styles.error); 
      valid = false;
    } else {
      passwordConfirm.current?.setAttribute('class', ''); 
    }
    if (!valid) {
      setError('Please fill every field');
      return;
    }

    newUser({
        email: email.current?.value,
        password: password.current?.value,
        name: name.current?.value,
        lastName: lastName.current?.value
    }).then(() => {
      setError('');
      navigate(-1);
    }).catch(err => {
      if (err.message === 'auth/email-already-in-use' || err.message === 'auth/email-already-exists') {
        setError('This email is already taken');
      } else {
        setError(err.message);
      }
    });
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.gradientCircle}></div>
      <main className={styles.box}>
        <h1>Sign Up</h1>
        <form onSubmit={event => {
          event.preventDefault();
          signUp();
        }}>
          <input className={styles.name} type='text' placeholder='Name' ref={name} />
          <input className={styles.lastName} type='text' placeholder='Last Name' ref={lastName} />
          <input type='text' placeholder='Email' ref={email} onChange={() => isEmailValid(email)} />
          <input type='password' placeholder='Password' ref={password} onChange={() => isPasswordValid(password)} />
          <input type='password' placeholder='Confirm Password' ref={passwordConfirm} onChange={() => isPasswordConfirmValid(password, passwordConfirm)} />
          <div className={styles.belowFields}>
            <span>{ error }</span>
            <button className={styles.signUpButton} type='submit'>Sign Up</button>
          </div>
        </form>
      </main>
    </div>
  );
}