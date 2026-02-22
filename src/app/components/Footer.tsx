import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-4 mt-16" style={{ backgroundColor: '#5E7F64' }}>
      <div className="max-w-6xl mx-auto text-center text-white">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5" style={{ color: '#EEB467' }} />
          <p className="text-lg">
            ASUCD Pantry - Supporting Aggies, No Questions Asked
          </p>
        </div>
        <p className="text-sm opacity-90">
          © {new Date().getFullYear()} ASUCD Pantry. All rights reserved.
        </p>
        <p className="text-xs opacity-75 mt-2">
          Ensuring no UC Davis student lacks basic necessities or misses a meal due to financial reasons.
        </p>
      </div>
    </footer>
  );
}
