import styles from './downArrow.module.scss';

export default function() {
  return (
    <a className={styles.downArrow} href='#first-section'>
      <span className='material-symbols-outlined' >expand_more</span>
    </a>
  );
}