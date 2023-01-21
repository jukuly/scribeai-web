import styles from './footer.module.scss';

export default function() {

  return (
    <ul className={styles.footerList}>
      <li>
        <a href='/'>
          Home
        </a>
      </li>
      <li>
        <a href='/download'>
          Download
        </a>
      </li>
      <li>
        <a href='/pricing'>
          Pricing
        </a>
      </li>
      <li>
        <a href='/terms'>
          Terms and Conditions
        </a>
      </li>
    </ul>
  );
}