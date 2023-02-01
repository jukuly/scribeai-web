import styles from './pricing.module.scss';

export default function() {
  return (
    <div className={styles.pricing}>
      <div className={styles.gradientCircle}></div>
      <main className={styles.plans}>
        <div className={styles.box}>
          <h1>Every plan includes</h1>
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
        </div>
        <div className={styles.box}>
          <h1>Basic</h1>
          <span className={styles.access}>50 requests/day</span>
          <div className={styles.price}>$4.99</div>
        </div>
        <div className={styles.box}>
          <h1>Standard</h1>
          <span className={styles.access}>500 requests/day</span>
          <div className={styles.price}>
            <div className={styles.crossed}>14.99</div>
            -30% $9.99
          </div>
        </div>
        <div className={styles.box}>
          <h1>Pro</h1>
          <span className={styles.access}>Unlimited access</span>
          <div className={styles.price}>$24.99</div>
        </div>
      </main>
    </div> 
  );
}