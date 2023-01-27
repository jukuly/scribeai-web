import { User } from 'firebase/auth';
import { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import AccountMenu from './accountMenu/accountMenu';
import styles from './header.module.scss';
import SignInMenu from './signInMenu/signInMenu';

export default function({ user }: { user: User | null}) {
  const accountPopUp = useRef(null);
  const [accountClicked, setAccountClicked] = useState<boolean>(false);

  useClickOutside(accountPopUp, event => {
    setAccountClicked(false);
  });

  return (
    <nav className={styles.header}>
      <ul className={styles.headerList}>
        <li className={`${styles.home} ${styles.headerListItem}`}>
          <a href='/' draggable='false'>
            ScribeAI.
          </a>
        </li>
        <li className={`${styles.download} ${styles.headerListItem}`}>
          <a href='/download' draggable='false'>
            <button className={styles.headerButton}>
              Download
            </button>
          </a>
        </li>
        <li className={`${styles.account} ${styles.headerListItem}`}>
          <button className={styles.headerButton} onClick={() => setAccountClicked(true)}>
            { 
              user ? 'My Account' : 'Sign In' 
            }
          </button>
          <div ref={accountPopUp}>
            {
              accountClicked && (user ? <AccountMenu /> : <SignInMenu />)
            }
          </div>
        </li>
      </ul>
    </nav>
  );
}