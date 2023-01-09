import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home/home';
import Download from './pages/download/download';
import SignIn from './pages/signIn/signIn';
import { useState, useEffect } from 'react';

export default function () {
  const [top, setTop] = useState<boolean>(true);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY === 0) {
        setTop(true);
      } else {
        setTop(false);
      }
    }
    return () => {
      window.onscroll = null;
    };
  }, [])
  
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home top={top} />} />
          <Route path='/download' element={<Download />} />
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}