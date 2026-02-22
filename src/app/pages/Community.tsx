import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimatedContent } from '../components/AnimatedContent';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Users, Heart, ArrowRight, Clock, Users as UsersIcon } from 'lucide-react';
import { Recipe, getCommunityRecipes, deleteCommunityRecipe } from '../data/recipes';

export function Community() {
  const navigate = useNavigate();
  const [communityRecipes, setCommunityRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    setCommunityRecipes(getCommunityRecipes());
  }, []);

  const handleDelete = (id: number) => {
    deleteCommunityRecipe(id);
    setCommunityRecipes(getCommunityRecipes());
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <AnimatedContent direction="up" duration={1}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-10 h-10" style={{ color: '#E37861' }} />
              <h1 className="text-5xl" style={{ color: '#5E7F64' }}>Community</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your favorite recipes and discover what the Aggie community is cooking
            </p>
          </div>
        </AnimatedContent>

        {/* Share Recipe CTA */}
        <AnimatedContent direction="up" delay={0.1}>
          <div 
            className="bg-gradient-to-r from-[#E37861] to-[#EEB467] rounded-2xl p-8 mb-12 shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            onClick={() => navigate('/community/share')}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white flex-1">
                <h2 className="text-3xl mb-3">Got a Great Recipe?</h2>
                <p className="text-lg opacity-90">
                  Share your pantry ingredient creations with fellow Aggies and help others discover delicious meals!
                </p>
              </div>
              <Button
                className="bg-white px-8 py-6 text-lg rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
                style={{ color: '#E37861' }}
              >
                Share Recipe
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </AnimatedContent>

        {/* Mission Statement */}
        <AnimatedContent direction="up" delay={0.2}>
          <div className="bg-white rounded-xl p-8 mb-12 shadow-lg border-2" style={{ borderColor: '#F4E8D0' }}>
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#E37861' }} />
              <div>
                <h2 className="text-2xl mb-3" style={{ color: '#5E7F64' }}>
                  Building a Recipe Community
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  The Pantry is more than just a food resource—it's a community of Aggies helping each other thrive. 
                  Share your favorite recipes using pantry ingredients, creative cooking hacks, and budget-friendly meal ideas. 
                  Your recipes might inspire someone else and help reduce food waste across campus.
                </p>
              </div>
            </div>
          </div>
        </AnimatedContent>

        {/* Community Posts Feed */}
        <AnimatedContent direction="up" delay={0.3}>
          <div className="mb-8">
            <h2 className="text-2xl mb-6" style={{ color: '#5E7F64' }}>
              Recent Community Recipes
            </h2>

            {communityRecipes.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-lg border-2 text-center" style={{ borderColor: '#F4E8D0' }}>
                <p className="text-gray-600 mb-4">No community recipes yet. Be the first to share!</p>
                <Button onClick={() => navigate('/community/share')} style={{ backgroundColor: '#E37861' }}>
                  Share a Recipe
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {communityRecipes.map((recipe, index) => (
                  <AnimatedContent key={recipe.id} direction="up" delay={0.1 * index}>
                    <div className="group relative bg-white rounded-xl p-6 shadow-lg border-2 hover:shadow-xl transition-all duration-300" style={{ borderColor: '#F4E8D0' }}>
                      <button
                        aria-label="Delete community recipe"
                        className="hidden group-hover:flex absolute top-3 right-3 w-8 h-8 rounded-full items-center justify-center text-white"
                        style={{ backgroundColor: '#E37861' }}
                        onClick={() => handleDelete(recipe.id)}
                      >
                        ×
                      </button>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl" style={{ color: '#5E7F64' }}>{recipe.title}</h3>
                          <p className="text-xs text-gray-500">Shared by the community</p>
                        </div>
                        <Badge className="px-3 py-1 text-xs rounded-full" style={{ backgroundColor: '#E37861', color: '#ffffff' }}>
                          {recipe.prepTime + recipe.cookTime} min
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {recipe.instructions[0] || 'A tasty community submission.'}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {recipe.tags.slice(0, 3).map(tag => (
                          <Badge 
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full"
                            style={{ backgroundColor: '#F4E8D0', color: '#5E7F64' }}
                          >
                            {tag}
                          </Badge>
                        ))}
                        {recipe.dietary.vegan && (
                          <Badge className="px-3 py-1 text-xs rounded-full" style={{ backgroundColor: '#5E7F64', color: '#ffffff' }}>
                            Vegan
                          </Badge>
                        )}
                        {recipe.dietary.vegetarian && (
                          <Badge className="px-3 py-1 text-xs rounded-full" style={{ backgroundColor: '#4A8D8F', color: '#ffffff' }}>
                            Vegetarian
                          </Badge>
                        )}
                        {recipe.dietary.glutenFree && (
                          <Badge className="px-3 py-1 text-xs rounded-full" style={{ backgroundColor: '#EEB467', color: '#ffffff' }}>
                            Gluten-Free
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#F4E8D0' }}>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{recipe.prepTime + recipe.cookTime} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <UsersIcon className="w-4 h-4" />
                            <span>{recipe.servings} servings</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          style={{ borderColor: '#E37861', color: '#E37861' }}
                          onClick={() => navigate('/recipes', { state: { source: 'community' } })}
                        >
                          View in Recipes
                        </Button>
                      </div>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            )}
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}
