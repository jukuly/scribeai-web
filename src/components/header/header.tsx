import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import styles from './header.module.scss';
import SignIn from './signIn/signIn';

export default function() {
  const signInPopUp = useRef(null);
  
  const [signInClicked, setSignInClicked] = useState<boolean>(false);
  
  useClickOutside(signInPopUp, event => {
    setSignInClicked(false);
  });

  return (
    <nav className={styles.header}>
      <ul>
        <li className={styles.home}>
          <a href='/'>
            ScribeAI.
          </a>
        </li>
        <li className={styles.download}>
          <a href='/download'>
            <button className={styles.headerButton}>
              Download
            </button>
          </a>
        </li>
        <li className={styles.signIn}>
          <button className={styles.headerButton} onClick={() => setSignInClicked(signInClicked => !signInClicked)}>
            Sign In
          </button>
          <div ref={signInPopUp}>
            {
              signInClicked && <SignIn />
            }
          </div>
        </li>
      </ul>
    </nav>
  );
}