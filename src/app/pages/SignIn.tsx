import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { LogIn, Mail, Lock } from 'lucide-react';
import pantryLogo from '../../assets/c1b5b9baf07ae5309b8fbbe587eb92892ebcbbc6.png';

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo authentication - just check if fields are filled
    if (email && password) {
      // Set logged in state
      localStorage.setItem('pantry_logged_in', 'true');
      localStorage.setItem('pantry_user_email', email);
      
      // Navigate to home
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F4E8D0' }}>
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            
          </div>
          <h1 className="text-5xl mb-3" style={{ color: '#5E7F64' }}>Aggie Recs</h1>
          <p className="text-xl text-gray-600">partnered with <span style={{ fontFamily: 'var(--font-body)' }}>THE PANTRY</span></p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2" style={{ borderColor: '#DDBE86' }}>
          <div className="flex items-center gap-3 mb-6">
            <LogIn className="w-6 h-6" style={{ color: '#E37861' }} />
            <h2 className="text-2xl" style={{ color: '#E37861' }}>
              Sign In
            </h2>
          </div>

          <p className="text-gray-600 mb-6">
            Use your UC Davis credentials to access the recipe app
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#5E7F64' }}>
                UC Davis Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="aggieuser@ucdavis.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2"
                  style={{ borderColor: '#DDBE86' }}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm mb-2" style={{ color: '#5E7F64' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2"
                  style={{ borderColor: '#DDBE86' }}
                  required
                />
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full py-4 text-lg rounded-xl flex items-center justify-center gap-2 mt-6"
              style={{ backgroundColor: '#E37861' }}
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6"></p>
        </div>

        {/* Info Cards */}
        <div className="mt-8 space-y-3">
          <div 
            className="bg-white rounded-xl p-4 shadow-md border-2 text-center"
            style={{ borderColor: '#5E7F64' }}
          >
            <p className="text-sm" style={{ color: '#5E7F64' }}>
              <strong>Confidential & No Questions Asked</strong>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              All pantry services are completely confidential
            </p>
          </div>

          <div 
            className="bg-white rounded-xl p-4 shadow-md border-2 text-center"
            style={{ borderColor: '#EEB467' }}
          >
            <p className="text-sm" style={{ color: '#5E7F64' }}>
              <strong>For UC Davis Students</strong>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Helping Aggies transform pantry ingredients into nutritious meals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}