import styles from './pricing.module.scss';

export default function() {
  return (
    <div className={styles.pricing}>
      <div className={styles.gradientCircle}></div>
      <div className={styles.box}>
        <h1>Pricing</h1>
      </div>
    </div> 
  );
}