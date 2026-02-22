import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimatedContent } from '../components/AnimatedContent';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Upload, ArrowLeft } from 'lucide-react';
import { addCommunityRecipe } from '../data/recipes';

export function ShareRecipe() {
  const navigate = useNavigate();
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [dietarySelections, setDietarySelections] = useState<string[]>([]);

  const toggleDietary = (value: string) => {
    setDietarySelections(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientList = ingredients
      .split(/\r?\n/)
      .map(i => i.trim())
      .filter(Boolean);

    const instructionList = instructions
      .split(/\r?\n/)
      .map(step => step.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean);

    addCommunityRecipe({
      title: recipeName.trim(),
      ingredients: ingredientList,
      instructions: instructionList,
      prepTime: Number(prepTime) || 0,
      cookTime: Number(cookTime) || 0,
      servings: Number(servings) || 1,
      dietaryTags: dietarySelections,
    });

    alert('Thank you! Your recipe has been added to the community.');

    setRecipeName('');
    setIngredients('');
    setInstructions('');
    setPrepTime('');
    setCookTime('');
    setServings('');
    setDietarySelections([]);
    navigate('/community');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <AnimatedContent direction="up" duration={0.8}>
          <Button
            onClick={() => navigate('/community')}
            variant="outline"
            className="mb-6 flex items-center gap-2"
            style={{ borderColor: '#5E7F64', color: '#5E7F64' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Community
          </Button>
        </AnimatedContent>

        {/* Header Section */}
        <AnimatedContent direction="up" duration={1}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Upload className="w-10 h-10" style={{ color: '#E37861' }} />
              <h1 className="text-5xl" style={{ color: '#5E7F64' }}>Share Your Recipe</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Help fellow Aggies discover new ways to use pantry ingredients
            </p>
          </div>
        </AnimatedContent>

        {/* Share Recipe Form */}
        <AnimatedContent direction="up" delay={0.2}>
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2" style={{ borderColor: '#DDBE86' }}>
            <p className="text-gray-600 mb-8">
              Have a favorite recipe using pantry ingredients? Share it with the Aggie community! 
              All submissions are reviewed before being published to ensure quality and safety.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Recipe Name */}
              <div>
                <label className="block text-sm mb-2" style={{ color: '#5E7F64' }}>
                  Recipe Name *
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Quick Rice Bowl, Easy Pasta Bake"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2"
                  style={{ borderColor: '#DDBE86' }}
                  required
                />
              </div>

              {/* Ingredients */}
              <div>
                <label className="block text-sm mb-2" style={{ color: '#5E7F64' }}>
                  Ingredients (one per line) *
                </label>
                <textarea
                  placeholder="1 cup rice&#10;2 cans black beans&#10;1 onion, diced&#10;Salt and pepper to taste"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 min-h-32 resize-y"
                  style={{ borderColor: '#DDBE86' }}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  List each ingredient on a new line with quantity and preparation notes
                </p>
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-sm mb-2" style={{ color: '#5E7F64' }}>
                  Instructions (step by step) *
                </label>
                <textarea
                  placeholder="1. Cook rice according to package directions&#10;2. Heat beans in a pot&#10;3. Sauté onions until soft&#10;4. Combine and season to taste"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 min-h-40 resize-y"
                  style={{ borderColor: '#DDBE86' }}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Number each step clearly for easy following
                </p>
              </div>

              {/* Prep Time, Cook Time & Servings */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#5E7F64' }}>
                    Prep Time (minutes) *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 10"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: '#DDBE86' }}
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#5E7F64' }}>
                    Cook Time (minutes)
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 15"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: '#DDBE86' }}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#5E7F64' }}>
                    Servings *
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 4"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: '#DDBE86' }}
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Dietary Preferences (Optional) */}
              <div>
                <label className="block text-sm mb-3" style={{ color: '#5E7F64' }}>
                  Dietary Information (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all ${
                      dietarySelections.includes('vegan') ? 'ring-2 ring-offset-2' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: '#5E7F64', color: '#ffffff' }}
                    onClick={() => toggleDietary('vegan')}
                  >
                    Vegan
                  </Badge>
                  <Badge 
                    className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all ${
                      dietarySelections.includes('glutenFree') ? 'ring-2 ring-offset-2' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: '#EEB467', color: '#ffffff' }}
                    onClick={() => toggleDietary('glutenFree')}
                  >
                    Gluten-Free
                  </Badge>
                  <Badge 
                    className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all ${
                      dietarySelections.includes('halal') ? 'ring-2 ring-offset-2' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: '#E37861', color: '#ffffff' }}
                    onClick={() => toggleDietary('halal')}
                  >
                    Halal
                  </Badge>
                  <Badge 
                    className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all ${
                      dietarySelections.includes('nutFree') ? 'ring-2 ring-offset-2' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: '#DDBE86', color: '#ffffff' }}
                    onClick={() => toggleDietary('nutFree')}
                  >
                    Nut-Free
                  </Badge>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-4 text-lg rounded-xl flex items-center justify-center gap-2"
                style={{ backgroundColor: '#E37861' }}
              >
                <Upload className="w-5 h-5" />
                Submit Recipe
              </Button>

              <p className="text-xs text-center text-gray-500">
                By submitting, you agree to share your recipe with the UC Davis community. 
                All recipes are reviewed before publication.
              </p>
            </form>
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}
