import pantryRecipesCollection from '../../../recipes (2).json';
import pantryRecipeBook from '../../../pantry_recipe_book.json';

export interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  imageUrl: string;
  dietary: {
    vegan: boolean;
    vegetarian?: boolean;
    glutenFree: boolean;
    halal: boolean;
    nutFree: boolean;
    dairyFree?: boolean;
    eggFree?: boolean;
  };
  allergens?: {
    dairyFree: boolean;
    eggFree: boolean;
    nutFree: boolean;
  };
  appliances: string[]; // e.g., ['microwave'], ['stove'], ['oven'], ['none']
  category: string; // e.g., 'breakfast', 'lunch', 'dinner', 'snack'
  source: 'pantry' | 'community'; // Source of the recipe
}

export type RecipeMatch = {
  recipe: Recipe;
  matchCount: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  score: number; // 0-1 jaccard style
};

const communitySeedRecipes: Recipe[] = [
  {
    id: 3001,
    title: 'No-Cook Chickpea Salad Wrap',
    ingredients: ['canned chickpeas', 'tortilla', 'lemon', 'olive oil', 'garlic powder', 'salt', 'pepper', 'spinach'],
    instructions: [
      'Mash drained chickpeas with lemon juice, olive oil, garlic powder, salt, and pepper',
      'Lay spinach on a tortilla',
      'Spoon chickpea mixture on top and wrap tightly',
      'Serve immediately or chill for 10 minutes'
    ],
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    tags: ['community', 'no-cook', 'quick'],
    imageUrl: '',
    dietary: {
      vegan: true,
      vegetarian: true,
      glutenFree: false,
      halal: true,
      nutFree: true,
      dairyFree: true,
      eggFree: true,
    },
    appliances: ['none'],
    category: 'lunch',
    source: 'community'
  },
  {
    id: 3002,
    title: 'Microwave Mug Omelette',
    ingredients: ['2 eggs', 'spinach', 'tomato', 'salt', 'pepper'],
    instructions: [
      'Whisk eggs, salt, and pepper in a microwave-safe mug',
      'Stir in chopped spinach and diced tomato',
      'Microwave 60-90 seconds, stirring halfway, until set'
    ],
    prepTime: 3,
    cookTime: 2,
    servings: 1,
    difficulty: 'Easy',
    tags: ['community', 'microwave', 'quick'],
    imageUrl: '',
    dietary: {
      vegan: false,
      vegetarian: true,
      glutenFree: true,
      halal: true,
      nutFree: true,
      dairyFree: true,
      eggFree: false,
    },
    appliances: ['microwave'],
    category: 'breakfast',
    source: 'community'
  },
  {
    id: 3003,
    title: 'One-Pot Tomato Lentil Pasta',
    ingredients: ['pasta', 'canned lentils', 'canned tomatoes', 'garlic powder', 'onion powder', 'olive oil', 'salt', 'pepper'],
    instructions: [
      'Add pasta, lentils, tomatoes, spices, and water to a pot',
      'Simmer until pasta is al dente and liquid is mostly absorbed',
      'Finish with olive oil and adjust seasoning'
    ],
    prepTime: 5,
    cookTime: 15,
    servings: 3,
    difficulty: 'Easy',
    tags: ['community', 'one-pot', 'budget'],
    imageUrl: '',
    dietary: {
      vegan: true,
      vegetarian: true,
      glutenFree: false,
      halal: true,
      nutFree: true,
      dairyFree: true,
      eggFree: true,
    },
    appliances: ['stove'],
    category: 'dinner',
    source: 'community'
  },
  {
    id: 3004,
    title: 'Peanut Butter Banana Overnight Oats',
    ingredients: ['oats', 'milk', 'peanut butter', 'banana', 'honey'],
    instructions: [
      'Combine oats, milk, peanut butter, and honey in a jar',
      'Stir well and refrigerate overnight',
      'Top with sliced banana before serving'
    ],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    tags: ['community', 'no-cook', 'meal-prep'],
    imageUrl: '',
    dietary: {
      vegan: false,
      vegetarian: true,
      glutenFree: false,
      halal: true,
      nutFree: false,
      dairyFree: false,
      eggFree: true,
    },
    appliances: ['none'],
    category: 'breakfast',
    source: 'community'
  }
];

const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Simple Rice & Beans Bowl',
    ingredients: ['rice', 'beans', 'onion', 'garlic', 'cumin'],
    instructions: [
      'Cook rice according to package directions',
      'Sauté diced onion and minced garlic in a pan',
      'Add drained beans and cumin, heat through',
      'Serve beans over rice',
      'Optional: top with cheese or salsa if available'
    ],
    prepTime: 5,
    cookTime: 25,
    servings: 4,
    difficulty: 'Easy',
    tags: ['vegetarian', 'budget-friendly', 'protein-rich'],
    imageUrl: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800',
    dietary: {
      vegan: true,
      glutenFree: true,
      halal: true,
      nutFree: true
    },
    appliances: ['stove'],
    category: 'dinner',
    source: 'pantry'
  },
  {
    id: 2,
    title: 'Quick Pasta Marinara',
    ingredients: ['pasta', 'tomatoes', 'garlic', 'olive oil', 'basil'],
    instructions: [
      'Boil water and cook pasta until al dente',
      'While pasta cooks, sauté minced garlic in olive oil',
      'Add crushed tomatoes and simmer for 10 minutes',
      'Drain pasta and toss with sauce',
      'Garnish with fresh or dried basil'
    ],
    prepTime: 5,
    cookTime: 15,
    servings: 3,
    difficulty: 'Easy',
    tags: ['vegetarian', 'quick', 'italian'],
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    dietary: {
      vegan: true,
      glutenFree: false,
      halal: true,
      nutFree: true
    },
    appliances: ['stove'],
    category: 'dinner',
    source: 'pantry'
  },
  {
    id: 3,
    title: 'Vegetable Stir-Fry',
    ingredients: ['rice', 'carrots', 'broccoli', 'soy sauce', 'garlic', 'ginger'],
    instructions: [
      'Cook rice and set aside',
      'Chop vegetables into bite-sized pieces',
      'Heat oil in a large pan or wok',
      'Stir-fry vegetables with minced garlic and ginger',
      'Add soy sauce and serve over rice'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    tags: ['vegetarian', 'healthy', 'asian'],
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    dietary: {
      vegan: true,
      glutenFree: true,
      halal: true,
      nutFree: true
    },
    appliances: ['stove'],
    category: 'dinner',
    source: 'pantry'
  },
  {
    id: 4,
    title: 'Egg Fried Rice',
    ingredients: ['rice', 'eggs', 'soy sauce', 'peas', 'carrots', 'garlic'],
    instructions: [
      'Use day-old rice if possible (freshly cooked works too)',
      'Scramble eggs in a large pan and set aside',
      'Stir-fry diced vegetables in the same pan',
      'Add rice and break up any clumps',
      'Mix in eggs and soy sauce, stir well'
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 3,
    difficulty: 'Easy',
    tags: ['budget-friendly', 'quick', 'protein-rich'],
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    dietary: {
      vegan: false,
      glutenFree: true,
      halal: true,
      nutFree: true
    },
    appliances: ['stove'],
    category: 'dinner',
    source: 'pantry'
  },
  {
    id: 5,
    title: 'Black Bean Tacos',
    ingredients: ['beans', 'tortillas', 'onion', 'cumin', 'cheese', 'lettuce'],
    instructions: [
      'Sauté diced onion until soft',
      'Add black beans and cumin, mash slightly',
      'Warm tortillas in a dry pan',
      'Fill tortillas with bean mixture',
      'Top with shredded cheese and lettuce'
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 4,
    difficulty: 'Easy',
    tags: ['vegetarian', 'mexican', 'quick'],
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
    dietary: {
      vegan: false,
      glutenFree: true,
      halal: true,
      nutFree: true
    },
    appliances: ['stove'],
    category: 'lunch',
    source: 'pantry'
  },
  {
    id: 6,
    title: 'Tomato & Basil Soup',
    ingredients: ['tomatoes', 'onion', 'garlic', 'basil', 'vegetable broth'],
    instructions: [
      'Sauté diced onion and garlic until fragrant',
      'Add crushed tomatoes and vegetable broth',
      'Simmer for 20 minutes',
      'Blend until smooth (or leave chunky)',
      'Stir in fresh or dried basil'
    ],
    prepTime: 5,
    cookTime: 25,
    servings: 4,
    difficulty: 'Easy',
    tags: ['vegetarian', 'soup', 'comfort-food'],
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    dietary: {
      vegan: true,
      glutenFree: true,
      halal: true,
      nutFree: true
    },
    appliances: ['stove'],
    category: 'soup',
    source: 'pantry'
  },
  {
    id: 7,
    title: 'Peanut Butter Banana Oatmeal',
    ingredients: ['oats', 'banana', 'peanut butter', 'milk', 'honey'],
    instructions: [
      'Cook oats with milk according to package directions',
      'Slice banana',
      'Top cooked oatmeal with banana slices',
      'Add a spoonful of peanut butter',
      'Drizzle with honey if desired'
    ],
    prepTime: 2,
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    tags: ['breakfast', 'healthy', 'quick'],
    imageUrl: 'https://images.unsplash.com/photo-1517673776422-9b97b44b8b18?w=800',
    dietary: {
      vegan: true,
      glutenFree: true,
      halal: true,
      nutFree: false
    },
    appliances: ['microwave'],
    category: 'breakfast',
    source: 'pantry'
  },
  {
    id: 8,
    title: 'Microwave Baked Potato',
    ingredients: ['potatoes', 'olive oil', 'salt', 'pepper'],
    instructions: [
      'Wash potato and pierce with a fork several times',
      'Rub with olive oil and sprinkle with salt',
      'Place on microwave-safe plate',
      'Microwave on high for 5-7 minutes until tender',
      'Top with your choice of toppings (cheese, beans, veggies)'
    ],
    prepTime: 2,
    cookTime: 7,
    servings: 1,
    difficulty: 'Easy',
    tags: ['quick', 'microwave-friendly', 'customizable'],
    imageUrl: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800',
    dietary: {
      vegan: true,
      glutenFree: true,
      halal: true,
      nutFree: true
    },
    appliances: ['microwave'],
    category: 'lunch',
    source: 'pantry'
  },
  {
    id: 9,
    title: 'Lentil Curry',
    ingredients: ['lentils', 'onion', 'tomatoes', 'curry powder', 'coconut milk'],
    instructions: [
      'Sauté diced onion until translucent',
      'Add curry powder and cook for 1 minute',
      'Add lentils, tomatoes, and coconut milk',
      'Simmer for 25-30 minutes until lentils are tender',
      'Serve over rice'
    ],
    prepTime: 5,
    cookTime: 35,
    servings: 6,
    difficulty: 'Medium',
    tags: ['vegetarian', 'indian', 'protein-rich'],
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800',
    dietary: {
      vegan: true,
      glutenFree: true,
      halal: true,
      nutFree: true
    },
    appliances: ['stove'],
    category: 'dinner',
    source: 'pantry'
  },
  {
    id: 10,
    title: 'Veggie Quesadilla',
    ingredients: ['tortillas', 'cheese', 'bell peppers', 'onion', 'beans'],
    instructions: [
      'Sauté sliced peppers and onions until soft',
      'Place tortilla in a pan',
      'Add cheese, vegetables, and beans on half',
      'Fold tortilla in half and cook until golden',
      'Flip and cook other side, cut into wedges'
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    tags: ['vegetarian', 'quick', 'mexican'],
    imageUrl: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800',
    dietary: {
      vegan: false,
      glutenFree: true,
      halal: true,
      nutFree: true
    },
    appliances: ['stove'],
    category: 'lunch',
    source: 'pantry'
  },
  {
    id: 11,
    title: 'Instant Ramen Upgrade',
    ingredients: ['ramen noodles', 'eggs', 'frozen vegetables', 'soy sauce', 'green onions'],
    instructions: [
      'Boil water in kettle or microwave',
      'Add ramen noodles and frozen vegetables',
      'Let sit for 3 minutes',
      'Add a beaten egg and stir (or microwave egg separately)',
      'Season with soy sauce and top with green onions'
    ],
    prepTime: 2,
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    tags: ['quick', 'budget-friendly', 'dorm-friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
    dietary: {
      vegan: false,
      glutenFree: false,
      halal: true,
      nutFree: true
    },
    appliances: ['microwave', 'kettle'],
    category: 'lunch',
    source: 'pantry'
  },
  {
    id: 12,
    title: 'Microwave Mac & Cheese',
    ingredients: ['pasta', 'milk', 'cheese', 'butter', 'salt'],
    instructions: [
      'Place pasta in microwave-safe bowl with water to cover',
      'Microwave for 8-10 minutes, stirring halfway',
      'Drain excess water',
      'Add milk, butter, and shredded cheese',
      'Microwave for 1 more minute and stir until creamy'
    ],
    prepTime: 2,
    cookTime: 11,
    servings: 2,
    difficulty: 'Easy',
    tags: ['comfort-food', 'microwave-friendly', 'quick'],
    imageUrl: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=800',
    dietary: {
      vegan: false,
      glutenFree: false,
      halal: true,
      nutFree: true
    },
    appliances: ['microwave'],
    category: 'dinner',
    source: 'pantry'
  },
  {
    id: 13,
    title: 'Apple Cinnamon Oats (No Cook)',
    ingredients: ['oats', 'milk', 'apple', 'cinnamon', 'honey'],
    instructions: [
      'Mix oats and milk in a jar or bowl',
      'Dice apple and add to mixture',
      'Sprinkle with cinnamon and drizzle honey',
      'Stir well and refrigerate overnight',
      'Enjoy cold the next morning'
    ],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    tags: ['breakfast', 'no-cook', 'overnight', 'healthy'],
    imageUrl: 'https://images.unsplash.com/photo-1517673776422-9b97b44b8b18?w=800',
    dietary: {
      vegan: false,
      glutenFree: true,
      halal: true,
      nutFree: true
    },
    appliances: ['none'],
    category: 'breakfast',
    source: 'pantry'
  },
  {
    id: 14,
    title: 'Bean & Veggie Wrap',
    ingredients: ['tortillas', 'beans', 'lettuce', 'tomatoes', 'salsa'],
    instructions: [
      'Warm beans in microwave if desired',
      'Warm tortilla for 15-20 seconds in microwave',
      'Layer beans, chopped lettuce, and tomatoes',
      'Add salsa on top',
      'Roll up and enjoy'
    ],
    prepTime: 5,
    cookTime: 1,
    servings: 1,
    difficulty: 'Easy',
    tags: ['no-cook', 'quick', 'portable'],
    imageUrl: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800',
    dietary: {
      vegan: true,
      glutenFree: true,
      halal: true,
      nutFree: true
    },
    appliances: ['microwave'],
    category: 'lunch',
    source: 'pantry'
  },
  {
    id: 15,
    title: 'Fruit & Yogurt Parfait',
    ingredients: ['yogurt', 'granola', 'banana', 'berries', 'honey'],
    instructions: [
      'Layer yogurt in a cup or bowl',
      'Add sliced banana and berries',
      'Sprinkle granola on top',
      'Drizzle with honey',
      'No cooking required!'
    ],
    prepTime: 3,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    tags: ['breakfast', 'no-cook', 'healthy', 'quick'],
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
    dietary: {
      vegan: false,
      glutenFree: false,
      halal: true,
      nutFree: false
    },
    appliances: ['none'],
    category: 'breakfast',
    source: 'pantry'
  },
  {
    id: 16,
    title: 'PB&J Energy Bites',
    ingredients: ['oats', 'peanut butter', 'honey', 'dried fruit', 'cinnamon'],
    instructions: [
      'Mix oats, peanut butter, and honey in a bowl',
      'Chop dried fruit and add to mixture',
      'Add cinnamon and mix well',
      'Roll into small balls',
      'Refrigerate for 30 minutes and enjoy'
    ],
    prepTime: 10,
    cookTime: 0,
    servings: 12,
    difficulty: 'Easy',
    tags: ['snack', 'no-cook', 'portable', 'energy-boost'],
    imageUrl: 'https://images.unsplash.com/photo-1590080876192-4b93e3b0e8f0?w=800',
    dietary: {
      vegan: true,
      glutenFree: true,
      halal: true,
      nutFree: false
    },
    appliances: ['none'],
    category: 'snack',
    source: 'pantry'
  },
  {
    id: 17,
    title: 'Veggie Pasta Salad',
    ingredients: ['pasta', 'bell peppers', 'tomatoes', 'olive oil', 'Italian seasoning'],
    instructions: [
      'Cook pasta according to package directions',
      'Rinse with cold water and drain',
      'Chop vegetables into small pieces',
      'Mix pasta with vegetables',
      'Dress with olive oil and Italian seasoning'
    ],
    prepTime: 5,
    cookTime: 10,
    servings: 4,
    difficulty: 'Easy',
    tags: ['cold-dish', 'meal-prep', 'portable'],
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    dietary: {
      vegan: true,
      glutenFree: false,
      halal: true,
      nutFree: true
    },
    appliances: ['stove', 'microwave'],
    category: 'lunch',
    source: 'pantry'
  },
  {
    id: 18,
    title: 'Hummus & Veggie Snack Plate',
    ingredients: ['hummus', 'carrots', 'bell peppers', 'cucumbers', 'pretzels'],
    instructions: [
      'Wash and slice vegetables into sticks',
      'Arrange on a plate',
      'Add hummus to center for dipping',
      'Add pretzels on the side',
      'No cooking needed!'
    ],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    difficulty: 'Easy',
    tags: ['snack', 'no-cook', 'healthy', 'quick'],
    imageUrl: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800',
    dietary: {
      vegan: true,
      glutenFree: false,
      halal: true,
      nutFree: true
    },
    appliances: ['none'],
    category: 'snack',
    source: 'pantry'
  }
];

type PantryCollectionJson = {
  pantry_recipes_collection?: {
    recipe_name: string;
    ingredients_all: string[];
    ingredients_at_pantry?: string[];
    preparation: string;
  }[];
};

type PantryBookJson = {
  pantry_recipe_book?: {
    sections?: {
      item?: string;
      recipes?: {
        name: string;
        ready_in?: string;
        serves?: number;
        calories?: number;
        ingredients: string[];
        preparation: string[] | string;
        tips?: string;
      }[];
    }[];
  };
};

const IMAGE_POOL = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80&sat=-50',
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80&hue=20',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80&blur=0.2',
  'https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&auto=format&fit=crop&q=80'
];

const pickImageForTitle = (title: string) => {
  const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return IMAGE_POOL[hash % IMAGE_POOL.length];
};

const normalizeIngredients = (ingredients: string[] = []) =>
  ingredients.map(ing => ing.trim()).filter(Boolean);

const splitInstructions = (preparation: string[] | string): string[] => {
  if (Array.isArray(preparation)) {
    return preparation.map(step => step.trim()).filter(Boolean);
  }

  const sentences = preparation
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map(step => step.trim())
    .filter(Boolean);

  return sentences.length > 0 ? sentences : [preparation.trim()];
};

const inferDifficulty = (ingredients: string[]): Recipe['difficulty'] =>
  ingredients.length > 10 ? 'Medium' : 'Easy';

const inferDietary = (ingredients: string[]) => {
  const lower = ingredients.map(i => i.toLowerCase());
  const hasMeat = lower.some(i =>
    ['chicken', 'beef', 'pork', 'turkey', 'bacon', 'sausage', 'fish', 'tuna', 'shrimp'].some(k => i.includes(k))
  );
  const hasDairy = lower.some(i =>
    ['cheese', 'milk', 'butter', 'cream', 'yogurt', 'alfredo', 'half and half', 'parmesan'].some(k => i.includes(k))
  );
  const hasEgg = lower.some(i => ['egg', 'eggs'].some(k => i.includes(k)));
  const hasGluten = lower.some(i =>
    ['pasta', 'noodle', 'bread', 'flour', 'tortilla', 'spaghetti', 'udon', 'orzo'].some(k => i.includes(k))
  );
  const hasNuts = lower.some(i =>
    ['peanut', 'almond', 'cashew', 'pecan', 'walnut'].some(k => i.includes(k))
  );

  return {
    vegan: !hasMeat && !hasDairy && !hasEgg,
    vegetarian: !hasMeat,
    glutenFree: !hasGluten,
    halal: !lower.some(i => i.includes('pork') || i.includes('bacon')),
    nutFree: !hasNuts,
    dairyFree: !hasDairy,
    eggFree: !hasEgg,
  } satisfies Recipe['dietary'];
};

const inferAppliances = (text: string): Recipe['appliances'] => {
  const lower = text.toLowerCase();
  const appliances: string[] = [];

  if (lower.includes('microwave')) appliances.push('microwave');
  if (lower.includes('oven') || lower.includes('bake')) appliances.push('oven');
  if (
    lower.includes('stove') ||
    lower.includes('pan') ||
    lower.includes('skillet') ||
    lower.includes('boil') ||
    lower.includes('heat') ||
    lower.includes('cook') ||
    lower.includes('saute') ||
    lower.includes('sauté')
  ) {
    appliances.push('stove');
  }

  return appliances.length > 0 ? Array.from(new Set(appliances)) : ['none'];
};

const parseReadyMinutes = (ready?: string) => {
  const match = ready?.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

const STORAGE_KEY = 'pantry_community_recipes_v1';
const STORAGE_TOMBSTONES_KEY = 'pantry_community_recipes_tombstones_v1';

export type NewCommunityRecipe = {
  title: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  dietaryTags?: string[];
};

const enrichRecipe = (recipe: Recipe): Recipe => {
  const inferred = inferDietary(recipe.ingredients);
  const dietary = {
    ...inferred,
    ...recipe.dietary,
    vegetarian: recipe.dietary.vegetarian ?? inferred.vegetarian,
    dairyFree: recipe.dietary.dairyFree ?? inferred.dairyFree,
    eggFree: recipe.dietary.eggFree ?? inferred.eggFree,
  } satisfies Recipe['dietary'];

  const allergens = {
    dairyFree: dietary.dairyFree ?? true,
    eggFree: dietary.eggFree ?? true,
    nutFree: dietary.nutFree,
  };

  return {
    ...recipe,
    imageUrl: recipe.imageUrl || pickImageForTitle(recipe.title),
    dietary,
    allergens,
  } satisfies Recipe;
};

const loadCommunityRecipesFromStorage = (): Recipe[] => {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Recipe[];
    return parsed.map(enrichRecipe);
  } catch (err) {
    console.warn('Failed to read community recipes from storage', err);
    return [];
  }
};

const saveCommunityRecipesToStorage = (recipesToSave: Recipe[]) => {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipesToSave));
  } catch (err) {
    console.warn('Failed to save community recipes', err);
  }
};

const loadTombstones = (): number[] => {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_TOMBSTONES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch (err) {
    console.warn('Failed to read tombstones', err);
    return [];
  }
};

const saveTombstones = (ids: number[]) => {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_TOMBSTONES_KEY, JSON.stringify(ids));
  } catch (err) {
    console.warn('Failed to save tombstones', err);
  }
};

const scrapedPantryCollection: Recipe[] = ((pantryRecipesCollection as PantryCollectionJson).pantry_recipes_collection || []).map((item, idx) => {
  const ingredients = normalizeIngredients(item.ingredients_all);
  const instructions = splitInstructions(item.preparation);
  const appliances = inferAppliances(item.preparation);
  const totalTime = 20;
  const prepTime = Math.max(5, Math.round(totalTime * 0.4));
  const cookTime = Math.max(5, totalTime - prepTime);

  return {
    id: 1000 + idx,
    title: item.recipe_name,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    servings: 2,
    difficulty: inferDifficulty(ingredients),
    tags: ['pantry-collection', ...appliances],
    imageUrl: pickImageForTitle(item.recipe_name),
    dietary: inferDietary(ingredients),
    appliances,
    category: 'dinner',
    source: 'pantry',
  } satisfies Recipe;
});

const scrapedPantryBook: Recipe[] = ((pantryRecipeBook as PantryBookJson).pantry_recipe_book?.sections || []).flatMap((section, sectionIdx) => {
  return (section.recipes || []).map((recipe, idx) => {
    const ingredients = normalizeIngredients(recipe.ingredients);
    const instructions = splitInstructions(recipe.preparation);
    const totalTime = parseReadyMinutes(recipe.ready_in) || 20;
    const prepTime = Math.max(5, Math.round(totalTime * 0.4));
    const cookTime = Math.max(5, totalTime - prepTime);
    const appliances = inferAppliances(instructions.join(' '));

    return {
      id: 2000 + sectionIdx * 100 + idx,
      title: recipe.name || `Recipe ${sectionIdx + 1}-${idx + 1}`,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings: recipe.serves || 2,
      difficulty: inferDifficulty(ingredients),
      tags: ['pantry-book', section.item || 'pantry'],
      imageUrl: pickImageForTitle(recipe.name || `Recipe ${sectionIdx + 1}-${idx + 1}`),
      dietary: inferDietary(ingredients),
      appliances,
      category: 'dinner',
      source: 'pantry',
    } satisfies Recipe;
  });
});

const baseRecipes: Recipe[] = [
  ...scrapedPantryCollection,
  ...scrapedPantryBook,
  ...communitySeedRecipes,
  ...mockRecipes,
].map(enrichRecipe);

export const recipes = baseRecipes;

export const getAllRecipes = (): Recipe[] => {
  const tombstones = new Set(loadTombstones());
  const stored = loadCommunityRecipesFromStorage().filter(r => !tombstones.has(r.id));
  const base = baseRecipes.filter(r => !(r.source === 'community' && tombstones.has(r.id)));
  return [...base, ...stored];
};

export const getCommunityRecipes = (): Recipe[] =>
  getAllRecipes().filter(recipe => recipe.source === 'community');

export function addCommunityRecipe(newRecipe: NewCommunityRecipe): Recipe {
  const ingredients = normalizeIngredients(newRecipe.ingredients);
  const instructions = splitInstructions(newRecipe.instructions);
  const totalTime = Math.max(5, (newRecipe.prepTime || 0) + (newRecipe.cookTime || 0));
  const prepTime = Math.max(1, newRecipe.prepTime || Math.round(totalTime * 0.5));
  const cookTime = Math.max(0, totalTime - prepTime);
  const appliances = inferAppliances(instructions.join(' '));
  const inferredDietary = inferDietary(ingredients);

  const dietaryFromTags = (tag: string) => (newRecipe.dietaryTags || []).some(t => t.toLowerCase() === tag.toLowerCase());

  const recipe: Recipe = enrichRecipe({
    id: Date.now(),
    title: newRecipe.title,
    ingredients,
    instructions,
    prepTime,
    cookTime,
    servings: newRecipe.servings || 2,
    difficulty: inferDifficulty(ingredients),
    tags: ['community', ...(newRecipe.dietaryTags || [])],
    imageUrl: pickImageForTitle(newRecipe.title),
    dietary: {
      ...inferredDietary,
      vegan: inferredDietary.vegan || dietaryFromTags('vegan'),
      vegetarian: inferredDietary.vegetarian || dietaryFromTags('vegetarian'),
      glutenFree: inferredDietary.glutenFree || dietaryFromTags('gluten-free') || dietaryFromTags('glutenFree'),
      nutFree: inferredDietary.nutFree || dietaryFromTags('nut-free') || dietaryFromTags('nutFree'),
      dairyFree: inferredDietary.dairyFree || dietaryFromTags('dairy-free') || dietaryFromTags('dairyFree'),
      eggFree: inferredDietary.eggFree || dietaryFromTags('egg-free') || dietaryFromTags('eggFree'),
    },
    appliances,
    category: 'dinner',
    source: 'community',
  });

  const existing = loadCommunityRecipesFromStorage();
  const updated = [...existing, recipe];
  saveCommunityRecipesToStorage(updated);
  // Ensure tombstones are cleared for this id if re-added
  const tombstones = loadTombstones().filter(id => id !== recipe.id);
  saveTombstones(tombstones);
  return recipe;
}

export function deleteCommunityRecipe(id: number) {
  const existing = loadCommunityRecipesFromStorage().filter(r => r.id !== id);
  saveCommunityRecipesToStorage(existing);
  const tombstones = Array.from(new Set([...loadTombstones(), id]));
  saveTombstones(tombstones);
}

export function getRecipeMatches(
  userIngredients: string[],
  matchMode: 'exact' | 'partial' = 'partial',
  pool: Recipe[] = getAllRecipes()
): RecipeMatch[] {
  if (userIngredients.length === 0) {
    return pool.map(recipe => ({
      recipe,
      matchCount: 0,
      matchedIngredients: [],
      missingIngredients: recipe.ingredients,
      score: 0,
    }));
  }

  const normalize = (value: string) => value.trim().toLowerCase();
  const normalizedIngredients = userIngredients.map(normalize);

  return pool
    .map(recipe => {
      const normalizedRecipeIngredients = recipe.ingredients.map(normalize);

      const matchedIngredients: string[] = [];

      normalizedRecipeIngredients.forEach((ing, idx) => {
        const isMatch = normalizedIngredients.some(userIng =>
          matchMode === 'exact'
            ? ing === userIng
            : ing.includes(userIng) || userIng.includes(ing)
        );
        if (isMatch) {
          matchedIngredients.push(recipe.ingredients[idx]);
        }
      });

      const matchCount = matchedIngredients.length;

      const missingIngredients = recipe.ingredients.filter((_, idx) => {
        const ing = normalizedRecipeIngredients[idx];
        return !normalizedIngredients.some(userIng =>
          matchMode === 'exact'
            ? ing === userIng
            : ing.includes(userIng) || userIng.includes(ing)
        );
      });

      const union = new Set([...normalizedRecipeIngredients, ...normalizedIngredients]);
      const score = matchCount === 0 ? 0 : matchCount / union.size;

      return { recipe, matchCount, matchedIngredients, missingIngredients, score } satisfies RecipeMatch;
    })
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.score - a.score || b.matchCount - a.matchCount);
}

export function getRecipesByIngredients(
  userIngredients: string[],
  matchMode: 'exact' | 'partial' = 'partial',
  pool: Recipe[] = getAllRecipes()
): Recipe[] {
  return getRecipeMatches(userIngredients, matchMode, pool).map(m => m.recipe);
}