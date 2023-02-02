import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { firestoreInstance } from '../firebase';
import initializeStripe from './initializeStripe';

export async function createCheckoutSession(uid: string, price: string) {
  const checkoutSessionRef = await addDoc(collection(firestoreInstance, `users/${uid}/checkout_sessions`), {
    price: price,
    success_url: window.location.origin,
    cancel_url: window.location.origin
  });

  onSnapshot(checkoutSessionRef, async(snap) => {
    const { sessionId } = snap.data()!;
    if (sessionId) {
      const stripe = await initializeStripe();
      stripe?.redirectToCheckout({ sessionId });
    }
  });
}
