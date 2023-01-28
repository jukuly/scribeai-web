import styles from './pricing.module.scss';

export default function() {
  return (
    <div className={styles.pricing}>
      <div className={styles.gradientCircle}></div>
      <main className={styles.plans}>
        <div className={styles.box}>
          <h1>Standard</h1>
          <ul>
            <li>
              Text completion
            </li>
            <li>
              Sentence construction from keywords
            </li>
            <li>
              Grammar correction
            </li>
            <li>
              Rephrasing in chosen style
            </li>
            <li>
              Translation
            </li>
          </ul>
          <span className={styles.smallText}>*500 requests/day</span>
          <div className={styles.price}>
            <div className={styles.crossed}>9.99</div>
            -20% $7.99
          </div>
        </div>
        <div className={styles.box}>
          <h1>Pro</h1>
          <div className={styles.pro}>Unlimited access to everything in the Standard tier</div>
          <div className={styles.price}>$24.99</div>
        </div>
      </main>
    </div> 
  );
}