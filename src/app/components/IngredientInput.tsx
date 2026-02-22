import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
  className?: string;
}

export function IngredientInput({ ingredients, onIngredientsChange, className = '' }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim().toLowerCase())) {
      onIngredientsChange([...ingredients, inputValue.trim().toLowerCase()]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    onIngredientsChange(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  return (
    <div className={className}>
      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Enter an ingredient (e.g., rice, beans, tomatoes)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-6 text-lg rounded-xl border-2 focus:ring-2"
          style={{ borderColor: '#DDBE86' }}
        />
        <Button 
          onClick={handleAddIngredient}
          className="px-6 py-6 rounded-xl"
          style={{ backgroundColor: '#5E7F64' }}
        >
          Add
        </Button>
      </div>

      {/* Ingredients List */}
      {ingredients.length > 0 && (
        <div>
          <p className="text-sm mb-3" style={{ color: '#5E7F64' }}>
            Your ingredients:
          </p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <Badge 
                key={ingredient}
                className="px-4 py-2 text-base rounded-full flex items-center gap-2"
                style={{ backgroundColor: '#EEB467', color: '#ffffff' }}
              >
                {ingredient}
                <button
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="hover:opacity-70 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
