import styles from './accountMenu.module.scss';
import { authInstance } from '../../../firebase';
import { signOut } from 'firebase/auth';

export default function() {

  return (
    <div className={styles.box}>
      <ul>
        <li>
          <span className='material-symbols-outlined person'>
            person
          </span>
          Profile
        </li>
        <li onClick={() => signOut(authInstance)}>
          <span className='material-symbols-outlined'>
            logout
          </span>
          Sign Out
        </li>
      </ul>
    </div>
  );
}