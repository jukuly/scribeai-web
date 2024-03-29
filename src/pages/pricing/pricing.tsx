import { EmailAuthProvider, reauthenticateWithCredential, User } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { useState } from 'react';
import { Loading } from '../../components/loading/loading';
import PopUp from '../../components/popUp/popUp';
import { functionsInstance } from '../../firebase';
import { createCheckoutSession } from '../../stripe/createCheckoutSession';
import usePremiumStatus from '../../stripe/usePremiumStatus';
import styles from './pricing.module.scss';

const upgradeSubscription = httpsCallable(functionsInstance, 'upgradeSubscription');
const cancelSubscription = httpsCallable(functionsInstance, 'cancelSubscription');

export default function({ user }: { user: User | null }) {
  const premiumStatus = usePremiumStatus(user);

  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [afterPopup, setAfterPopup] = useState<() => any>(() => {});
  const [loading, setLoading] = useState<boolean>(false);

  async function subscriptionOnClick(plan: string, priceId: string): Promise<void> {
    if (!user || premiumStatus === plan) return;
    if (!premiumStatus) {
      createCheckoutSession(user.uid, priceId);
      return;
    }
    setAfterPopup(() => {
      return async () => {
        await upgradeSubscription({ newSubscription: priceId });
        alert('Subscription successfully updated!');
      }
    });
    setOpenPopUp(openPopUp => !openPopUp);
    setPrompt(`to confirm you want to upgrade from
    ${premiumStatus!.replace(/^./, premiumStatus![0].toUpperCase())} to ${plan.replace(/^./, plan[0].toUpperCase())}`);
  }

  async function cancelOnClick(): Promise<void> {
    if (!user) return;
    setAfterPopup(async () => {
      return async () => {
        await cancelSubscription();
        alert('Subscription successfully canceled!');
      }
    });
    setOpenPopUp(openPopUp => !openPopUp);
    setPrompt(`to confirm you want to cancel your subscription
    You will still have access for the reminder of the billing cycle`);
  }

  async function reauthenticate(callback: () => void) {
    if (!user) return;
    setLoading(true);
    try {
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email!, currentPassword!));
      if (callback) await callback();
    } catch (err: any) {
      if (err.code === 'auth/wrong-password') alert('Password incorrect');
      else alert(err.code);
    }
    setCurrentPassword('');
    setLoading(false);
    setOpenPopUp(openPopUp => !openPopUp);
  }

  return (
    <>
      <PopUp openTrigger={openPopUp}>
        {
          loading ?
          <Loading />
          :
          <>
            <span>Please enter your password { prompt }</span>
            <form className={styles.popUpForm} onSubmit={event => {
                event.preventDefault();
                reauthenticate(() => afterPopup!());
              }}>
              <input type='password' value={currentPassword} onChange={event => setCurrentPassword(event.target.value)} />
              <button className={styles.button} type='submit'>Reauthenticate</button>
            </form>
          </>
        }
      </PopUp>
      <div className={styles.pricing}>
        <div className={styles.gradientCircle}></div>
        <main className={`${styles.plans} ${user && styles.clickable}`}>
          <div className={styles.box} onClick={() => subscriptionOnClick('basic', process.env.REACT_APP_STRIPE_PRICE_BASIC!)}>
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
          <div className={styles.box} onClick={() => subscriptionOnClick('standard', process.env.REACT_APP_STRIPE_PRICE_STANDARD!)}>
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
          <div className={styles.box} onClick={() => subscriptionOnClick('pro', process.env.REACT_APP_STRIPE_PRICE_PRO!)}>
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
            <a className={styles.linkBelow} href={process.env.REACT_APP_STRIPE_CUSTOMER_PORTAL}>
              Customer portal
            </a>
          </>
        }
      </div> 
    </>
  );
}