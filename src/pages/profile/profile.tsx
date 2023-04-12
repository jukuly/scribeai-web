import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile, User } from 'firebase/auth';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './profile.module.scss';

import usePremiumStatus from '../../stripe/usePremiumStatus';
import PopUp from '../../components/popUp/popUp';
import { Loading } from '../../components/loading/loading';

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
  const [editName, setEditName] = useState<boolean>(false);
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('idk ur password');
  const [displayName, setDisplayName] = useState<string>('');

  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirm = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const premiumStatus = usePremiumStatus(user);

  useEffect(() => {
    if (user) setDisplayName(user?.displayName!);
  }, [user])

  function saveChanges() {
    if (!user) return;
    if (editName) {
      updateProfile(user, {
        displayName: displayName
      });
    }
    if (editPassword) {
      if (!isPasswordValid(passwordRef)) {
        setError('Invalid password');
        return;
      }
      if (!isPasswordConfirmValid(passwordRef, passwordConfirm)) {
        setError('Passwords doesn\'t match');
        return;
      }
      updatePassword(user, password)
        .catch(err => {
          if (err.code === 'auth/requires-recent-login') {
            setOpenPopUp(openPopUp => !openPopUp);        
          } else {
            setError(err.code)
          }
        });
    }
    setEditName(false);
    setEditPassword(false);
    setError('');
  }

  function changePasswordAfterReauthentication() {
    if (!user) return;
    setLoading(true);
    reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email!, currentPassword!))
      .then(() => {
        updatePassword(user, password);
      })
      .catch(e => {
        if (e.code === 'auth/wrong-password') setError('Password incorrect');
        else setError(e.code);
      });
    setCurrentPassword('');
    setLoading(false);
    setOpenPopUp(openPopUp => !openPopUp);
  }

  return (
    <>
      <PopUp openTrigger={openPopUp}>
        {
          loading ?
          <Loading />
          :
          <>
            <div>Please enter your current password</div>
            <form className={styles.popUpForm} onSubmit={event => {
                event.preventDefault();
                changePasswordAfterReauthentication();
              }}>
              <input type='password' value={currentPassword} onChange={event => setCurrentPassword(event.target.value)} />
              <button className={styles.button} type='submit'>Reauthenticate</button>
            </form>
          </>
        }
      </PopUp>
      <div className={styles.profile}>
        <div className={styles.gradientCircle}></div>
        <main className={styles.box}>
          <h1>Profile</h1>
          <button className={styles.plan} onClick={() => navigate('/pricing')}>
            {premiumStatus ? premiumStatus.replace(/^./, premiumStatus[0].toUpperCase()) : 'Choose a plan'}
          </button>
          <form onSubmit={event => {
            event.preventDefault();
            saveChanges();
          }}>
            <span>
              Display Name:
            </span>
            <div className={styles.inputGroup}>
              <input type='text' value={displayName} disabled={!editName} onChange={event => setDisplayName(event.target.value)} />
              <span className={`material-symbols-outlined ${styles.edit} ${!editName ? styles.show : styles.hidden}`} onClick={() => setEditName(true)}>
                edit
              </span>
            </div>

            <span>
              Password:
            </span>
            <div className={styles.inputGroup}>
              <input type='password' value={password} ref={passwordRef} disabled={!editPassword} onChange={event => {
                isPasswordValid(passwordRef);
                setPassword(event.target.value);
                }} />
              <span className={`material-symbols-outlined ${styles.edit} ${!editPassword ? styles.show : styles.hidden}`} onClick={() => {
                setEditPassword(true);
                setPassword('');
                }}>
                edit
              </span>
            </div>
            {
              editPassword &&
              <>
                <span>
                  Confirm Password:
                </span>
                <div className={styles.inputGroup}>
                  <input type='password' ref={passwordConfirm} disabled={!editPassword} onChange={() => isPasswordConfirmValid(passwordRef, passwordConfirm)} />
                </div>
              </>
            }
            <div className={styles.belowFields}>
              <span>{ error }</span>
              <button className={styles.button} type='submit'>Save changes</button>
            </div>
          </form>
        </main>
      </div>
    </> 
  );
}