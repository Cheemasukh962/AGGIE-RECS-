import { Outlet, useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { BubbleMenu } from '../components/BubbleMenu';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';

export function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignInPage = location.pathname === '/signin';

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('pantry_logged_in') === 'true';
    
    // If not logged in and not on sign-in page, redirect to sign-in
    if (!isLoggedIn && !isSignInPage) {
      navigate('/signin');
    }
    
    // If logged in and on sign-in page, redirect to home
    if (isLoggedIn && isSignInPage) {
      navigate('/');
    }
  }, [location.pathname, navigate, isSignInPage]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isSignInPage && <BubbleMenu />}
      <main className={!isSignInPage ? 'pt-24 flex-grow' : 'flex-grow'}>
        <Outlet />
      </main>
      {!isSignInPage && <Footer />}
      <ScrollToTop />
    </div>
  );
}