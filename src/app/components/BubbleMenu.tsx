import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { gsap } from 'gsap';
import { LogOut } from 'lucide-react';
import pantryLogo from '../../assets/c1b5b9baf07ae5309b8fbbe587eb92892ebcbbc6.png';

const menuItems = [
  { name: 'Home', path: '/', color: '#5E7F64' },
  { name: 'Recipes', path: '/recipes', color: '#E37861' },
  { name: 'Community', path: '/community', color: '#EEB467' },
];

export function BubbleMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const bubbles = menuRef.current?.querySelectorAll('.menu-bubble');
    if (!bubbles) return;

    // Staggered animation on mount
    gsap.fromTo(
      bubbles,
      { 
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }
    );
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('pantry_logged_in');
    localStorage.removeItem('pantry_user_email');
    navigate('/signin');
  };

  return (
    <nav ref={menuRef} className="fixed top-6 left-0 right-0 z-50 flex items-center justify-center gap-2 md:gap-3 px-4 flex-wrap">
      {/* Logo Bubble */}
      <Link 
        to="/" 
        className="menu-bubble flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        style={{ backgroundColor: '#F4E8D0' }}
      >
        <img 
          src={pantryLogo} 
          alt="The Pantry Logo"
          className="w-full h-full rounded-full object-cover"
        />
      </Link>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="menu-bubble relative px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm md:text-base"
          style={{ 
            backgroundColor: location.pathname === item.path ? item.color : '#ffffff',
            color: location.pathname === item.path ? '#ffffff' : item.color,
            border: `2px solid ${item.color}`,
          }}
        >
          <span className="font-medium">{item.name}</span>
        </Link>
      ))}

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="menu-bubble relative px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm md:text-base flex items-center gap-2"
        style={{ 
          backgroundColor: '#ffffff',
          color: '#DDBE86',
          border: '2px solid #DDBE86',
        }}
      >
        <LogOut className="w-4 h-4" />
      </button>
    </nav>
  );
}
