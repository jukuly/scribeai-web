import { EmailAuthProvider, reauthenticateWithCredential, User } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { functionsInstance } from '../../firebase';
import { createCheckoutSession } from '../../stripe/createCheckoutSession';
import usePremiumStatus from '../../stripe/usePremiumStatus';
import styles from './pricing.module.scss';

const upgradeSubscription = httpsCallable(functionsInstance, 'upgradeSubscription');
const cancelSubscription = httpsCallable(functionsInstance, 'cancelSubscription');

export default function({ user }: { user: User | null }) {
  const premiumStatus = usePremiumStatus(user);

  async function subscriptionOnClick(plan: string, priceId: string): Promise<void> {
    if (!user || premiumStatus === plan) return;
    if (!premiumStatus) {
      createCheckoutSession(user.uid, priceId);
      return;
    }
    const password = prompt(
      `Enter your password to confirm you want to upgrade from ${premiumStatus!.replace(/^./, premiumStatus![0].toUpperCase())} to ${plan.replace(/^./, plan[0].toUpperCase())}`
    );
    try {
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email!, password!));
    } catch (err: any) {
      console.error(err.message);
      return;
    }
  
    await upgradeSubscription({ newSubscription: priceId });
    alert('Subscription successfully updated!');
  }

  async function cancelOnClick(): Promise<void> {
    if (!user) return;
    const password = prompt(
      `Enter your password to confirm you want to cancel your subscription
      You will still have access for the reminder of the billing cycle`
    );
    try {
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email!, password!));
    } catch (err: any) {
      console.error(err.message);
      return;
    }
    await cancelSubscription();
    alert('Subscription successfully canceled!');
  }

  return (
    <div className={styles.pricing}>
      <div className={styles.gradientCircle}></div>
      <main className={`${styles.plans} ${user && styles.clickable}`}>
        <div className={styles.box} onClick={() => subscriptionOnClick('basic', 'price_1MWWWwLCVjNRyPuJ10MB3j92')}>
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
        <div className={styles.box} onClick={() => subscriptionOnClick('standard', 'price_1MXqP3LCVjNRyPuJZK82is4C')}>
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
        <div className={styles.box} onClick={() => subscriptionOnClick('pro', 'price_1MXqTeLCVjNRyPuJZx8k915J')}>
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
        <>
          <span className={styles.linkBelow} onClick={() => cancelOnClick()}>
            Cancel subscription
          </span>
          <a className={styles.linkBelow} href='https://billing.stripe.com/p/login/test_eVadTj6Ld86u7BedQQ'>
            Customer portal
          </a>
        </>
      }
    </div> 
  );
}