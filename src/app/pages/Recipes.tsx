import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import { AnimatedContent } from '../components/AnimatedContent';
import { RecipeFilters } from '../components/RecipeFilters';
import { Recipe, getAllRecipes, getRecipeMatches, getRecipesByIngredients } from '../data/recipes';
import { fetchAiSuggestions, AiRecipeIdea } from '../lib/ai';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Clock, Users, ChefHat, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Recipes() {
  const location = useLocation();
  const userIngredients = useMemo(
    () => (location.state?.ingredients as string[]) || [],
    [location.state?.ingredients]
  );
  const initialSource = (location.state?.source as 'all' | 'pantry' | 'community') || 'all';
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [matchMeta, setMatchMeta] = useState<Record<number, { score: number; matched: string[]; missing: string[] }>>({});
  const [aiRecipes, setAiRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeSource, setRecipeSource] = useState<'all' | 'pantry' | 'community'>(initialSource);
  const [filters, setFilters] = useState<{
    dietary: string[];
    appliances: string[];
    allergens: string[];
    maxTime: number | null;
    matchMode: 'exact' | 'partial';
  }>({
    dietary: [],
    appliances: [],
    allergens: [],
    maxTime: null,
    matchMode: 'partial',
  });

  useEffect(() => {
    const pool = [...getAllRecipes(), ...aiRecipes];

    const matches = userIngredients.length > 0
      ? getRecipeMatches(userIngredients, filters.matchMode, pool)
      : pool.map(recipe => ({
          recipe,
          score: 0,
          matchedIngredients: [],
          missingIngredients: recipe.ingredients,
          matchCount: 0,
        }));

    let recipes_list = matches
      .map(m => m.recipe);

    // Build meta map for quick lookup and ordering by match strength
    const meta: Record<number, { score: number; matched: string[]; missing: string[]; matchCount: number }> = {};
    matches.forEach(m => {
      meta[m.recipe.id] = {
        score: m.score,
        matched: m.matchedIngredients,
        missing: m.missingIngredients,
        matchCount: m.matchCount,
      };
    });

    // Apply source filter
    if (recipeSource !== 'all') {
      recipes_list = recipes_list.filter(recipe => recipe.source === recipeSource);
    }

    // Apply dietary filters
    if (filters.dietary.length > 0) {
      recipes_list = recipes_list.filter(recipe => {
        return filters.dietary.every(diet => {
          if (diet === 'vegetarian') {
            return recipe.dietary.vegetarian ?? recipe.dietary.vegan;
          }
          return recipe.dietary[diet as keyof typeof recipe.dietary];
        });
      });
    }

    if (filters.allergens.length > 0) {
      recipes_list = recipes_list.filter(recipe => {
        const allergenInfo = recipe.allergens ?? {
          dairyFree: recipe.dietary.dairyFree ?? true,
          eggFree: recipe.dietary.eggFree ?? true,
          nutFree: recipe.dietary.nutFree,
        };

        return filters.allergens.every(allergen => allergenInfo[allergen as keyof typeof allergenInfo]);
      });
    }

    // Apply appliance filters
    if (filters.appliances.length > 0) {
      recipes_list = recipes_list.filter(recipe =>
        filters.appliances.some(appliance => recipe.appliances.includes(appliance))
      );
    }

    // Apply time filter
    if (filters.maxTime) {
      recipes_list = recipes_list.filter(recipe => 
        (recipe.prepTime + recipe.cookTime) <= filters.maxTime!
      );
    }

    // Sort by best match first (score, then match count, then fewer missing)
    recipes_list = recipes_list.slice().sort((a, b) => {
      const aMeta = meta[a.id] ?? { score: 0, matchCount: 0, missing: [] as string[] };
      const bMeta = meta[b.id] ?? { score: 0, matchCount: 0, missing: [] as string[] };
      return (
        (bMeta.score - aMeta.score) ||
        (bMeta.matchCount - aMeta.matchCount) ||
        (aMeta.missing.length - bMeta.missing.length)
      );
    });

    setFilteredRecipes(recipes_list);
    setMatchMeta(meta);
  }, [userIngredients, recipeSource, filters.dietary, filters.appliances, filters.allergens, filters.maxTime, filters.matchMode, aiRecipes]);

  useEffect(() => {
    const shouldFetchAi = userIngredients.length > 0;
    if (!shouldFetchAi) {
      setAiRecipes([]);
      return;
    }

    let cancelled = false;
    fetchAiSuggestions(userIngredients)
      .then((ideas) => {
        if (cancelled) return;
        const trimmed = ideas.slice(0, 5);
        const toRecipe = (idea: AiRecipeIdea, idx: number): Recipe => {
          const ingredients = idea.ingredients.length > 0 ? idea.ingredients : userIngredients;
          const instructions = idea.instructions.length > 0 ? idea.instructions : ['Combine ingredients and serve.'];
          const cleanTitle = idea.title.replace(/^[-*\s]*\d+\.\s*/, '').replace(/^[-*\s]+/, '');
          const title = cleanTitle.length > 0 ? cleanTitle : 'Pantry Idea';
          return {
            id: -(1000 + idx),
            title: `${title} (Suggested)`,
            ingredients,
            instructions,
            prepTime: 5,
            cookTime: 0,
            servings: 2,
            difficulty: 'Easy',
            tags: ['Suggested', 'AI'],
            imageUrl: '',
            dietary: {
              vegan: false,
              vegetarian: false,
              glutenFree: false,
              halal: true,
              nutFree: true,
              dairyFree: true,
              eggFree: true,
            },
            appliances: ['none'],
            category: 'snack',
            source: 'community',
          } satisfies Recipe;
        };
        setAiRecipes(trimmed.map(toRecipe));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error('AI suggestion fetch failed', err);
        setAiRecipes([]);
      });

    return () => {
      cancelled = true;
    };
  }, [userIngredients, filteredRecipes.length]);

  const RecipeCard = ({ recipe, index }: { recipe: Recipe; index: number }) => (
    <AnimatedContent 
      direction="up" 
      delay={index * 0.1}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={() => setSelectedRecipe(recipe)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setSelectedRecipe(recipe);
        }
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {userIngredients.length > 0 && matchMeta[recipe.id] && (
          <div 
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm"
            style={{ backgroundColor: '#E37861' }}
          >
            {matchMeta[recipe.id].matched.length}/{recipe.ingredients.length} match
          </div>
        )}
        <div 
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm"
          style={{ backgroundColor: '#5E7F64' }}
        >
          {recipe.difficulty}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl mb-3" style={{ color: '#E37861' }}>
          {recipe.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.slice(0, 3).map(tag => (
            <Badge 
              key={tag} 
              className="text-xs rounded-full"
              style={{ backgroundColor: '#DDBE86', color: '#ffffff' }}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        {userIngredients.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Matching ingredients:</p>
            <div className="flex flex-wrap gap-1">
              { (matchMeta[recipe.id]?.matched || [])
                .slice(0, 3)
                .map(ing => (
                  <Badge 
                    key={ing} 
                    className="text-xs rounded-full"
                    style={{ backgroundColor: '#EEB467', color: '#ffffff' }}
                  >
                    {ing}
                  </Badge>
                ))}
            </div>
            {matchMeta[recipe.id]?.missing?.length ? (
              <div className="mt-2 text-xs text-gray-500">
                Missing: {matchMeta[recipe.id].missing.slice(0, 2).join(', ')}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </AnimatedContent>
  );

  const RecipeDetail = ({ recipe }: { recipe: Recipe }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="relative h-64 overflow-hidden">
          <ImageWithFallback
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <Button
            onClick={() => setSelectedRecipe(null)}
            className="absolute top-4 right-4 rounded-full w-10 h-10 p-0"
            style={{ backgroundColor: '#5E7F64' }}
          >
            ✕
          </Button>
        </div>

        <div className="p-8">
          <h2 className="text-3xl mb-4" style={{ color: '#E37861' }}>
            {recipe.title}
          </h2>

          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: '#5E7F64' }} />
              <div>
                <p className="text-xs text-gray-500">Total Time</p>
                <p>{recipe.prepTime + recipe.cookTime} min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: '#5E7F64' }} />
              <div>
                <p className="text-xs text-gray-500">Servings</p>
                <p>{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5" style={{ color: '#5E7F64' }} />
              <div>
                <p className="text-xs text-gray-500">Difficulty</p>
                <p>{recipe.difficulty}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl mb-3" style={{ color: '#5E7F64' }}>Ingredients</h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, i) => {
                const isMatch = matchMeta[recipe.id]?.matched?.some(m => m.toLowerCase() === ingredient.toLowerCase());
                return (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 
                      className="w-5 h-5 flex-shrink-0" 
                      style={{ color: '#EEB467' }}
                    />
                    <span className={`capitalize ${isMatch ? 'font-semibold' : ''}`}>
                      {ingredient}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-xl mb-3" style={{ color: '#5E7F64' }}>Instructions</h3>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, i) => (
                <li key={i} className="flex gap-3">
                  <span 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: '#E37861' }}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="mb-4">
              <p className="text-sm mb-2" style={{ color: '#5E7F64' }}>Dietary Information:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.dietary.vegan && (
                  <Badge className="rounded-full" style={{ backgroundColor: '#5E7F64', color: '#ffffff' }}>
                    Vegan
                  </Badge>
                )}
                {recipe.dietary.glutenFree && (
                  <Badge className="rounded-full" style={{ backgroundColor: '#EEB467', color: '#ffffff' }}>
                    Gluten-Free
                  </Badge>
                )}
                {recipe.dietary.halal && (
                  <Badge className="rounded-full" style={{ backgroundColor: '#E37861', color: '#ffffff' }}>
                    Halal
                  </Badge>
                )}
                {recipe.dietary.nutFree && (
                  <Badge className="rounded-full" style={{ backgroundColor: '#DDBE86', color: '#ffffff' }}>
                    Nut-Free
                  </Badge>
                )}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm mb-2" style={{ color: '#5E7F64' }}>Equipment Needed:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.appliances.map(appliance => (
                  <Badge 
                    key={appliance} 
                    className="rounded-full capitalize"
                    style={{ backgroundColor: '#F4E8D0', color: '#5E7F64' }}
                  >
                    {appliance === 'none' ? 'No cooking required' : appliance}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: '#5E7F64' }}>Tags:</p>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map(tag => (
                  <Badge 
                    key={tag} 
                    className="rounded-full"
                    style={{ backgroundColor: '#DDBE86', color: '#ffffff' }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedContent direction="up">
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4" style={{ color: '#5E7F64' }}>
              Recipes for You
            </h1>
            {userIngredients.length > 0 ? (
              <div>
                <p className="text-lg text-gray-600 mb-4">
                  Recipes matching your ingredients
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {userIngredients.map(ing => (
                    <Badge 
                      key={ing} 
                      className="rounded-full px-4 py-2"
                      style={{ backgroundColor: '#EEB467', color: '#ffffff' }}
                    >
                      {ing}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-lg text-gray-600">
                Explore our collection of easy, nutritious recipes
              </p>
            )}
          </div>
        </AnimatedContent>

        {/* Recipe Source Filter */}
        <div className="mb-8 flex justify-center gap-3">
          <Button
            onClick={() => setRecipeSource('all')}
            className="px-6 py-3 rounded-xl transition-all"
            style={{ 
              backgroundColor: recipeSource === 'all' ? '#5E7F64' : '#F4E8D0',
              color: recipeSource === 'all' ? '#ffffff' : '#5E7F64'
            }}
          >
            All Recipes
          </Button>
          <Button
            onClick={() => setRecipeSource('pantry')}
            className="px-6 py-3 rounded-xl transition-all"
            style={{ 
              backgroundColor: recipeSource === 'pantry' ? '#E37861' : '#F4E8D0',
              color: recipeSource === 'pantry' ? '#ffffff' : '#E37861'
            }}
          >
            Pantry Recipes
          </Button>
          <Button
            onClick={() => setRecipeSource('community')}
            className="px-6 py-3 rounded-xl transition-all"
            style={{ 
              backgroundColor: recipeSource === 'community' ? '#EEB467' : '#F4E8D0',
              color: recipeSource === 'community' ? '#ffffff' : '#EEB467'
            }}
          >
            Community Recipes
          </Button>
        </div>

        <RecipeFilters
          filters={filters}
          onFilterChange={setFilters}
        />

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-lg" style={{ color: '#5E7F64' }}>
            <strong>{filteredRecipes.length}</strong> {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
          </p>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>
        ) : (
          <AnimatedContent direction="up" delay={0.2}>
            <div className="text-center py-12 bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-xl mb-2" style={{ color: '#E37861' }}>
                No recipes found matching your filters
              </p>
              <p className="text-gray-600 mb-6">
                Try adjusting your dietary restrictions, appliances, or time filters to see more options
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={() => setFilters({ dietary: [], appliances: [], allergens: [], maxTime: null, matchMode: 'partial' })}
                  style={{ backgroundColor: '#EEB467' }}
                >
                  Clear All Filters
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  style={{ borderColor: '#5E7F64', color: '#5E7F64' }}
                >
                  Try Different Ingredients
                </Button>
              </div>
            </div>
          </AnimatedContent>
        )}

      </div>

      {selectedRecipe && <RecipeDetail recipe={selectedRecipe} />}
    </div>
  );
}
