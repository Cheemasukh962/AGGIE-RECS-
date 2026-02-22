import { Link } from 'react-router';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl mb-4" style={{ color: '#E37861' }}>
          404
        </h1>
        <h2 className="text-3xl mb-6" style={{ color: '#5E7F64' }}>
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button 
            className="px-8 py-6 text-lg rounded-xl flex items-center gap-2 mx-auto"
            style={{ backgroundColor: '#5E7F64' }}
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
