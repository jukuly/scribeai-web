import styles from './header.module.scss';

export default function() {

  return (
    <nav className={styles.header}>
      <a className={styles.home} href='/'>
        ScribeAI.
      </a>
      <a className={styles.download} href='/download'>
        <button>
          Download
        </button>
      </a>
      <a className={styles.signIn} href='/sign-in'>
        <button>
          Sign In
        </button>
      </a>
    </nav>
  );
}