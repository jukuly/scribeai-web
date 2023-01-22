import styles from './accountMenu.module.scss';
import { authInstance } from '../../../firebase';
import { signOut } from 'firebase/auth';

export default function() {

  return (
    <div className={styles.box}>
      <ul>
        <li>
          <a className={styles.item} href='/profile' draggable='false'>
            <span className='material-symbols-outlined person'>
              person
            </span>
            Profile
          </a>          
        </li>
        <li className={styles.item} onClick={() => signOut(authInstance)}>
          <span className='material-symbols-outlined'>
            logout
          </span>
          Sign Out
        </li>
      </ul>
    </div>
  );
}