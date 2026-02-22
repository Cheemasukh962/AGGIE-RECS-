import image_f0df73579d745fc410220b1a7a7987d68e0d3abd from '../../assets/f0df73579d745fc410220b1a7a7987d68e0d3abd.png'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimatedContent } from '../components/AnimatedContent';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Search, X, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import pantryLogo from '../../assets/d6696a0b49935214bea2edee458bf7a2a059a74c.png';
import pantryLogoLarge from '../../assets/83126fd6130f9c9c3b1819468de7ce387cd383a9.png';

export function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim().toLowerCase())) {
      setIngredients([...ingredients, inputValue.trim().toLowerCase()]);
      setInputValue('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddIngredient();
    }
  };

  const handleFindRecipes = () => {
    // Navigate to recipes page with ingredients as state
    navigate('/recipes', { state: { ingredients } });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5E7F64]/20 to-[#E37861]/20" />
        <ImageWithFallback
          src={image_f0df73579d745fc410220b1a7a7987d68e0d3abd}
          alt="Fresh pantry ingredients"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          role="presentation"
        />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedContent direction="up" duration={1.2}>
            <div className="flex justify-center mb-6">
              <img 
                src={pantryLogoLarge} 
                alt="The Pantry" 
                className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto"
              />
            </div>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-700">
              Transform your food haul into delicious, nutritious meals
            </p>
            
          </AnimatedContent>
        </div>
      </section>

      {/* Ingredient Input Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatedContent direction="up" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-4" style={{ color: '#E37861' }}>Ready to Cook?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Enter your ingredients and we'll find perfect recipes for you
              </p>
              {/* Quick Tips */}
              <div className="bg-white rounded-xl p-6 mb-8 shadow-md border-2" style={{ borderColor: '#F4E8D0' }}>
                <div className="flex items-center justify-center mb-4">
          
                </div>
                <p className="text-sm mb-3 text-center" style={{ color: '#5E7F64' }}>
                  <strong>💡 Our Mission:</strong> Reduce food waste by helping you turn pantry ingredients into delicious meals
                </p>
                <p className="text-xs text-gray-600 text-center">
                  We understand college life can be challenging. This tool helps you make the most of what you have, 
                  whether it's from The Pantry, the dining halls, or your own groceries.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-2" style={{ borderColor: '#DDBE86' }}>
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
                <div className="mb-6">
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

              {/* Find Recipes Button */}
              <Button
                onClick={handleFindRecipes}
                disabled={ingredients.length === 0}
                className="w-full py-6 text-lg rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ backgroundColor: '#E37861' }}
              >
                <Search className="w-5 h-5" />
                Find Recipes
              </Button>
              
              {/* Browse All Recipes Option */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mb-2">or</p>
                <Button
                  onClick={() => navigate('/recipes')}
                  variant="outline"
                  className="w-full py-4 text-base rounded-xl"
                  style={{ borderColor: '#5E7F64', color: '#5E7F64' }}
                >
                  Browse All Recipes
                </Button>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-4 px-4" style={{ backgroundColor: '#F4E8D0' }}>
        <div className="max-w-5xl mx-auto">
          <AnimatedContent direction="up" delay={0.0}>
            {/* Pantry Resources */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl mb-6 text-center" style={{ color: '#E37861' }}>
                Pantry Resources
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 rounded-xl p-6" style={{ borderColor: '#DDBE86' }}>
                  <h4 className="text-xl mb-3" style={{ color: '#5E7F64' }}>
                    Walk-In Service
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Visit The Pantry in person to browse and select items. Available items include snacks, 
                    fruits, vegetables, bread, canned goods, rice, lentils, beans, and more.
                  </p>
                  <Button
                    onClick={() => window.open('https://thepantry.ucdavis.edu/', '_blank')}
                    className="w-full"
                    style={{ backgroundColor: '#5E7F64' }}
                  >
                    Visit The Pantry Website
                  </Button>
                </div>
                <div className="border-2 rounded-xl p-6" style={{ borderColor: '#DDBE86' }}>
                  <h4 className="text-xl mb-3" style={{ color: '#EEB467' }}>
                    Bag Orders
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Pre-order a bag of groceries online for convenient pickup. Choose from available 
                    items and have them ready when you arrive.
                  </p>
                  <Button
                    onClick={() => window.open('https://order.thepantry.ucdavis.edu/', '_blank')}
                    className="w-full"
                    style={{ backgroundColor: '#EEB467' }}
                  >
                    Order Online
                  </Button>
                </div>
                  <div className="border-2 rounded-xl p-6" style={{ borderColor: '#DDBE86' }}>
                  <h4 className="text-xl mb-3" style={{ color: '#E37861' }}>
                    Community Recipes
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Submit your own personal recipes using some of the ingredients in the pantry! Share your cooking experiences with the Aggie Community!
                  </p>
                  <Button
                    onClick={() => navigate('/recipes', { state: { source: 'community' } })}
                    className="w-full"
                    style={{ backgroundColor: '#E37861' }}
                  >
                    Go to Recipes
                  </Button>
                </div>
                <div className="border-2 rounded-xl p-6" style={{ borderColor: '#DDBE86' }}>
                  <h4 className="text-xl mb-3" style={{ color: '#E37861' }}>
                    Our Stock
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Wondering what we have in the pantry at the moment? This link will take you to what we have in stock and what will be coming in next!
                  </p>
                  <Button
                    onClick={() => window.open('https://abrupt-nightshade-be6.notion.site/ASUCD-Pantry-443afebccb974648b313b71a9815001e', '_blank')}
                    className="w-full"
                    style={{ backgroundColor: '#E37861' }}
                  >
                    Stock
            
                  </Button>
                </div>
              </div>
              
            </div>
          </AnimatedContent>
        </div>
      </section>
    </div>
  );
}