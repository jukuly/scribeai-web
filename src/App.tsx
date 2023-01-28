import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Home from './pages/home/home';
import SignUp from './pages/signUp/signUp';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { authInstance } from './firebase';
import ForgotPassword from './pages/forgotPassword/forgotPassword';
import Profile from './pages/profile/profile';
import AuthGuard from './components/authGuard/authGuard';
import TermsConditions from './pages/termsConditions/termsConditions';
import Pricing from './pages/pricing/pricing';
import Download from './pages/download/download';

export default function () {
  const [top, setTop] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY === 0) {
        setTop(true);
      } else {
        setTop(false);
      }
    }
    const unsubAuth = onAuthStateChanged(authInstance, user => {
      setUser(user);
    });

    return () => {
      window.onscroll = null;
      unsubAuth();
    }
  }, [])
  
  return (
    <>
      <Header user={user} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home top={top} />} />
          <Route path='/sign-up' element={<SignUp user={user} />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/terms-conditions' element={<TermsConditions />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/download' element={<Download />} />
          <Route path='/profile' element={<AuthGuard isSignedIn={!!user}><Profile user={user} /></AuthGuard>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}