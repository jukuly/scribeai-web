import { User } from 'firebase/auth';
import { createCheckoutSession } from '../../stripe/createCheckoutSession';
import styles from './pricing.module.scss';

export default function({ user }: { user: User | null }) {
  return (
    <div className={styles.pricing}>
      <div className={styles.gradientCircle}></div>
      <main className={`${styles.plans} ${user && styles.clickable}`}>
        <div className={styles.box} onClick={user ? () => createCheckoutSession(user.uid, 'price_1MWWWwLCVjNRyPuJ10MB3j92') : undefined}>
          <h1>Basic</h1>
          <ul>
            <li>
              Text completion
            </li>
            <li>
              Sentence construction from keywords
            </li>
          </ul>
          <span className={styles.access}>100 requests/day</span>
          <div className={styles.price}>
            <br />
            $4.99
            <div className={styles.smallText}>/month</div>
          </div>
        </div>
        <div className={styles.box} onClick={user ? undefined : undefined}>
          <h1>Standard</h1>
          <ul>
            <li>
              Everything in the basic tier
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
          <span className={styles.access}>500 requests/day</span>
          <div className={styles.price}>
            <div className={styles.crossed}>14.99</div>
              $9.99
            <div className={styles.smallText}>/month</div>
          </div>
        </div>
        <div className={styles.box} onClick={user ? undefined : undefined}>
          <h1>Pro</h1>
          <ul>
            <li>
              Everything in the standard tier
            </li>
          </ul>
          <span className={styles.access}>Unlimited access</span>
          <div className={styles.price}>
            <br />
            $24.99
            <div className={styles.smallText}>/month</div>
          </div>
        </div>
      </main>
      {
        user &&
        <span className={styles.cancel} onClick={user ? undefined : undefined}>
          Cancel subscription
        </span>
      }
    </div> 
  );
}