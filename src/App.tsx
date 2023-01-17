import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Home from './pages/home/home';
import Download from './pages/download/download';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { authInstance } from './firebase';

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
    const unsub = onAuthStateChanged(authInstance, user => {
      setUser(user);
    });

    return () => {
      window.onscroll = null;
      unsub();
    }
  }, [])
  
  return (
    <>
      <Header user={user} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home top={top} />} />
          <Route path='/download' element={<Download />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}