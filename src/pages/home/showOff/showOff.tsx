import styles from './showOff.module.scss';

export default function() {
  return (
    <div className={styles.showOff}>
      <div className={styles.menu}>
        <span className={`material-symbols-outlined ${styles.minimize}`}>minimize</span>
        <span className={`material-symbols-outlined ${styles.close}`}>close</span>
      </div>
      <p className={styles.text}>
        Hello professor,<br />
        <br />
        <span className={styles.selected}>I was wondering if after next class, I could come to your office to talk about the last exam. There</span>
      </p>
      <div className={styles.popUp}>
        <img src={require('../../../assets/show-off-pop-up.png')} alt='show-off-pop-up' draggable='false' />
        <span className={`material-symbols-outlined ${styles.pointer}`}>near_me</span>
      </div>
    </div>
  );
}