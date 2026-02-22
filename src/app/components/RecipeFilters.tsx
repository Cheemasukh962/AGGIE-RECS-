import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { X, ChefHat, Utensils, Clock } from 'lucide-react';

interface RecipeFiltersProps {
  filters: {
    dietary: string[];
    appliances: string[];
    allergens: string[];
    maxTime: number | null;
    matchMode: 'exact' | 'partial';
  };
  onFilterChange: (filters: {
    dietary: string[];
    appliances: string[];
    allergens: string[];
    maxTime: number | null;
    matchMode: 'exact' | 'partial';
  }) => void;
}

export function RecipeFilters({ filters, onFilterChange }: RecipeFiltersProps) {
  const dietaryOptions = [
    { value: 'vegan', label: 'Vegan', color: '#5E7F64' },
    { value: 'vegetarian', label: 'Vegetarian', color: '#4A8D8F' },
    { value: 'glutenFree', label: 'Gluten-Free', color: '#EEB467' },
    { value: 'halal', label: 'Halal', color: '#E37861' },
    { value: 'nutFree', label: 'Nut-Free', color: '#DDBE86' },
  ];

  const applianceOptions = [
    { value: 'none', label: 'No Cooking Required', icon: '🥗' },
    { value: 'microwave', label: 'Microwave Only', icon: '📱' },
    { value: 'kettle', label: 'Kettle Friendly', icon: '☕' },
    { value: 'stove', label: 'Stove/Full Kitchen', icon: '🔥' },
    { value: 'oven', label: 'Oven', icon: '🍳' },
  ];

  const allergenOptions = [
    { value: 'dairyFree', label: 'No Dairy' },
    { value: 'eggFree', label: 'No Eggs' },
    { value: 'nutFree', label: 'No Nuts' },
  ];

  const timeOptions = [
    { value: 5, label: 'Under 5 min' },
    { value: 15, label: 'Under 15 min' },
    { value: 30, label: 'Under 30 min' },
    { value: null, label: 'Any time' },
  ];

  const toggleDietary = (value: string) => {
    const newDietary = filters.dietary.includes(value)
      ? filters.dietary.filter(d => d !== value)
      : [...filters.dietary, value];
    onFilterChange({ ...filters, dietary: newDietary });
  };

  const toggleAppliance = (value: string) => {
    const newAppliances = filters.appliances.includes(value)
      ? filters.appliances.filter(a => a !== value)
      : [...filters.appliances, value];
    onFilterChange({ ...filters, appliances: newAppliances });
  };

  const toggleAllergen = (value: string) => {
    const newAllergens = filters.allergens.includes(value)
      ? filters.allergens.filter(a => a !== value)
      : [...filters.allergens, value];
    onFilterChange({ ...filters, allergens: newAllergens });
  };

  const setMaxTime = (time: number | null) => {
    onFilterChange({ ...filters, maxTime: time });
  };

  const clearAllFilters = () => {
    onFilterChange({ dietary: [], appliances: [], allergens: [], maxTime: null, matchMode: 'partial' });
  };

  const hasActiveFilters =
    filters.dietary.length > 0 ||
    filters.appliances.length > 0 ||
    filters.allergens.length > 0 ||
    filters.maxTime !== null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2" style={{ borderColor: '#F4E8D0' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl flex items-center gap-2" style={{ color: '#5E7F64' }}>
          <Utensils className="w-5 h-5" />
          Filter Recipes
        </h3>
        {hasActiveFilters && (
          <Button
            onClick={clearAllFilters}
            variant="ghost"
            size="sm"
            className="text-sm"
            style={{ color: '#E37861' }}
          >
            Clear All
          </Button>
        )}
      </div>


      {/* Dietary Restrictions */}
      <div className="mb-6">
        <p className="text-sm mb-3 flex items-center gap-2" style={{ color: '#5E7F64' }}>
          <ChefHat className="w-4 h-4" />
          Dietary Restrictions
        </p>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map(option => (
            <Badge
              key={option.value}
              onClick={() => toggleDietary(option.value)}
              className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all ${
                filters.dietary.includes(option.value) 
                  ? 'ring-2 ring-offset-2' 
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{ 
                backgroundColor: option.color,
                color: '#ffffff'
              }}
            >
              {option.label}
              {filters.dietary.includes(option.value) && (
                <span className="ml-1">✓</span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Appliances Available */}
      <div className="mb-6">
        <p className="text-sm mb-3 flex items-center gap-2" style={{ color: '#5E7F64' }}>
          <Utensils className="w-4 h-4" />
          What appliances do you have?
        </p>
        <div className="flex flex-wrap gap-2">
          {applianceOptions.map(option => (
            <Badge
              key={option.value}
              onClick={() => toggleAppliance(option.value)}
              className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all flex items-center gap-1 ${
                filters.appliances.includes(option.value)
                  ? 'ring-2 ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{ 
                backgroundColor: filters.appliances.includes(option.value) ? '#5E7F64' : '#DDBE86',
                color: '#ffffff',
              }}
            >
              <span>{option.icon}</span>
              {option.label}
              {filters.appliances.includes(option.value) && (
                <span className="ml-1">✓</span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Allergens */}
      <div className="mb-6">
        <p className="text-sm mb-3" style={{ color: '#5E7F64' }}>
          Allergens
        </p>
        <div className="flex flex-wrap gap-2">
          {allergenOptions.map(option => (
            <Badge
              key={option.value}
              onClick={() => toggleAllergen(option.value)}
              className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all ${
                filters.allergens.includes(option.value)
                  ? 'ring-2 ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                backgroundColor: filters.allergens.includes(option.value) ? '#4A8D8F' : '#F4E8D0',
                color: filters.allergens.includes(option.value) ? '#ffffff' : '#5E7F64',
              }}
            >
              {option.label}
              {filters.allergens.includes(option.value) && <span className="ml-1">✓</span>}
            </Badge>
          ))}
        </div>
      </div>

      {/* Time Available */}
      <div>
        <p className="text-sm mb-3 flex items-center gap-2" style={{ color: '#5E7F64' }}>
          <Clock className="w-4 h-4" />
          How much time do you have?
        </p>
        <div className="flex flex-wrap gap-2">
          {timeOptions.map(option => (
            <Badge
              key={option.value || 'any'}
              onClick={() => setMaxTime(option.value)}
              className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all ${
                filters.maxTime === option.value
                  ? 'ring-2 ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{ 
                backgroundColor: filters.maxTime === option.value ? '#EEB467' : '#F4E8D0',
                color: filters.maxTime === option.value ? '#ffffff' : '#5E7F64',
              }}
            >
              {option.label}
              {filters.maxTime === option.value && (
                <span className="ml-1">✓</span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.dietary.map(diet => (
              <Badge
                key={diet}
                className="px-3 py-1 text-xs rounded-full flex items-center gap-1"
                style={{ backgroundColor: '#E37861', color: '#ffffff' }}
              >
                {dietaryOptions.find(d => d.value === diet)?.label}
                <button onClick={() => toggleDietary(diet)} className="ml-1">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {filters.appliances.map(app => (
              <Badge
                key={app}
                className="px-3 py-1 text-xs rounded-full flex items-center gap-1"
                style={{ backgroundColor: '#5E7F64', color: '#ffffff' }}
              >
                {applianceOptions.find(a => a.value === app)?.label}
                <button onClick={() => toggleAppliance(app)} className="ml-1">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {filters.allergens.map(allergen => (
              <Badge
                key={allergen}
                className="px-3 py-1 text-xs rounded-full flex items-center gap-1"
                style={{ backgroundColor: '#4A8D8F', color: '#ffffff' }}
              >
                {allergenOptions.find(a => a.value === allergen)?.label}
                <button onClick={() => toggleAllergen(allergen)} className="ml-1">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {filters.maxTime && (
              <Badge
                className="px-3 py-1 text-xs rounded-full flex items-center gap-1"
                style={{ backgroundColor: '#EEB467', color: '#ffffff' }}
              >
                Under {filters.maxTime} min
                <button onClick={() => setMaxTime(null)} className="ml-1">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
