# The Pantry Recipe Web Application - Product Requirements Document (PRD)

## 1. Executive Summary

**Product Name:** The Pantry Recipe Web Application  
**Organization:** ASUCD at UC Davis  
**Purpose:** Help students transform food pantry ingredients into nutritious meals while reducing food waste  
**Core Philosophy:** "No questions asked" - warm, reliable, and confidential user experience

### Problem Statement
Students don't know how to convert pantry ingredients (snacks, fruits, veggies, bread, canned goods, rice, lentils, beans, etc.) into complete meals, leading to food waste and missed nutrition opportunities.

### Solution
An intelligent recipe recommendation system that matches available ingredients with vegetarian recipes, filtered by dietary restrictions and appliance availability.

---

## 2. Design System & Branding

### 2.1 Brand Colors (2025 ASUCD Branding Guidelines)
```css
--pantry-coral: #E37861    /* Primary accent, CTAs, highlights */
--pantry-gold: #EEB467     /* Secondary accent, badges */
--pantry-sand: #DDBE86     /* Tertiary accent, borders */
--pantry-cream: #F4E8D0    /* Backgrounds, soft elements */
--pantry-sage: #5E7F64     /* Primary text, main CTAs */
```

### 2.2 Typography
- **Headers:** Zing Script Rust (Premium font - placeholder: Yellowtail)
- **Body Text:** Rubik (Google Fonts)
- **Font Sizes:** Base 16px with responsive scaling

### 2.3 Design Principles
- **Warm & Welcoming:** Soft colors, rounded corners, friendly language
- **Accessible:** High contrast colors, readable fonts, clear captions
- **Student-Focused:** Mobile-first, quick actions, minimal friction
- **Confidential:** No login required, no data collection beyond session

---

## 3. Technical Stack

### 3.1 Core Technologies
- **Framework:** React 18+ with TypeScript
- **Routing:** React Router (Data Mode pattern)
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP with ScrollTrigger plugin
- **Icons:** Lucide React
- **Images:** Unsplash API integration

### 3.2 Architecture Pattern
```
/src
  /app
    App.tsx              # Entry point with RouterProvider
    routes.ts            # Route configuration
    /components          # Reusable UI components
    /pages               # Page-level components
    /data                # Recipe database and utilities
  /styles
    theme.css            # Design tokens and variables
    fonts.css            # Font imports
```

---

## 4. Component Architecture

### 4.1 Core Components

#### **BubbleMenu** (Navigation)
**Purpose:** Fixed top navigation with animated bubble design  
**Location:** `/src/app/components/BubbleMenu.tsx`

**Features:**
- Three-bubble layout: Home (left), Logo (center), Recipes (right)
- GSAP staggered animation on mount (scale from 0 to 1, 0.1s stagger)
- Active state indication with color fill
- Responsive sizing (mobile: smaller, desktop: larger)
- Hover effects with scale transform

**Props:** None (uses React Router's useLocation hook)

**Styling:**
- Home button: Sage green (#5E7F64)
- Recipes button: Coral (#E37861)
- Logo center: Cream background (#F4E8D0)
- Rounded-full design with shadows

**Implementation Details:**
```typescript
- Fixed positioning (top-6)
- z-index: 50
- GSAP animation: back.out(1.7) easing
- Dynamic border and background based on active route
```

---

#### **AnimatedContent** (Scroll Animations)
**Purpose:** Wrapper component for GSAP ScrollTrigger animations  
**Location:** `/src/app/components/AnimatedContent.tsx`

**Features:**
- Scroll-triggered fade-in animations
- Directional entry (up, down, left, right)
- Customizable delay and duration
- Automatic cleanup on unmount

**Props:**
```typescript
interface AnimatedContentProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}
```

**Default Values:**
- direction: 'up'
- delay: 0
- duration: 1

**Animation Behavior:**
- Initial state: opacity 0, translated 50px in direction
- Trigger point: "top 85%" of viewport
- Easing: power3.out
- Toggle actions: "play none none none"

---

#### **RecipeFilters** (Filter System)
**Purpose:** Comprehensive filtering for recipes  
**Location:** `/src/app/components/RecipeFilters.tsx`

**Filter Categories:**

1. **Dietary Restrictions**
   - Vegan (Sage green #5E7F64)
   - Gluten-Free (Gold #EEB467)
   - Halal (Coral #E37861)
   - Nut-Free (Sand #DDBE86)

2. **Appliance Availability**
   - No Cooking Required 🥗
   - Microwave Only 📱
   - Kettle Friendly ☕
   - Stove/Full Kitchen 🔥
   - Oven 🍳

3. **Time Available**
   - Under 15 minutes
   - Under 30 minutes
   - Any time

**Features:**
- Multi-select toggle functionality
- Active filter badges with checkmarks
- Clear all filters button
- Active filters summary section
- Visual feedback (ring on selection, opacity changes)

**Props:**
```typescript
interface RecipeFiltersProps {
  filters: {
    dietary: string[];
    appliances: string[];
    maxTime: number | null;
  };
  onFilterChange: (filters: {...}) => void;
}
```

---

#### **IngredientInput** (Not currently used but designed)
**Purpose:** Reusable ingredient input component  
**Note:** Currently implemented inline in Home page

**Expected Features:**
- Text input with "Add" button
- Enter key support
- Ingredient badge display with remove buttons
- Duplicate prevention

---

### 4.2 UI Component Library

Located in `/src/app/components/ui/`:
- **Button:** Primary, secondary, outline, ghost variants
- **Input:** Text input with focus states
- **Badge:** Colored label component
- **Card:** Container with shadow and border

All components follow Tailwind CSS v4 patterns with design token integration.

---

## 5. Page Structure

### 5.1 Root Layout
**File:** `/src/app/pages/Root.tsx`

**Components:**
- BubbleMenu (fixed navigation)
- ScrollToTop (route change handler)
- Outlet (React Router child routes)
- Footer (optional)

---

### 5.2 Home Page
**File:** `/src/app/pages/Home.tsx`  
**Route:** `/`

**Sections:**

#### **Hero Section**
- Height: 600px
- Background: Gradient overlay + pantry ingredients image
- Content: Large Pantry logo, tagline
- Animation: AnimatedContent fade-in (up direction, 1.2s duration)

#### **Ready to Cook Section**
- Heading: "Ready to Cook?" (Coral color)
- Mission statement box with tips
- **Ingredient Input:**
  - Text input + Add button
  - Real-time ingredient badges (removable with X)
  - "Find Recipes" button (disabled if no ingredients)
  - "Browse All Recipes" secondary option
- Background: White
- Padding: py-16

#### **Share Your Recipe Section**
- Background: Cream (#F4E8D0), reduced padding (py-4)
- **Form Fields:**
  - Recipe Name (text input)
  - Ingredients (textarea)
  - Instructions (textarea)
  - Prep Time (number input)
  - Servings (number input)
  - Submit Recipe button (Coral)

#### **Pantry Resources Section**
- 4-column grid (2x2 responsive)
- **Cards:**
  1. Walk-In Service (Sage) → External link
  2. Bag Orders (Gold) → External link
  3. Community Recipes (Coral) → Navigate to /recipes?source=community
  4. Our Stock (Coral) → External Notion link

**Key Features:**
- Ingredient state management (useState)
- Navigation with state passing (React Router)
- Form validation (duplicate prevention, trim whitespace)
- Keyboard support (Enter to add ingredient)

---

### 5.3 Recipes Page
**File:** `/src/app/pages/Recipes.tsx`  
**Route:** `/recipes`

**Layout:**

#### **Header Section**
- Page title
- Ingredient match indicator (if coming from Home with ingredients)
- Recipe source filter buttons:
  - All Recipes
  - Pantry Recipes (official)
  - Community Recipes (user-submitted)

#### **Filter Section**
- RecipeFilters component
- Persistent state across interactions

#### **Recipe Grid**
- Responsive grid: 1 column (mobile), 2-3 columns (tablet+)
- Recipe cards with:
  - Image (h-48, object-cover)
  - Difficulty badge (top-right overlay)
  - Title (Coral color)
  - Tags (up to 3, Sand color)
  - Metadata: Prep time, Cook time, Servings
  - Dietary indicators (icons)
  - Appliance requirements
  - Click to expand details

#### **Recipe Detail Modal**
- Full recipe view with:
  - Large image
  - Title and metadata
  - Complete ingredients list
  - Step-by-step instructions
  - Dietary and appliance info
  - Close button

**Key Features:**
- Receives ingredients from Home via location.state
- Automatic recipe matching (getRecipesByIngredients)
- Multi-layer filtering (dietary, appliance, time, source)
- Staggered animations (0.1s delay per card)
- Click-to-expand modal

**State Management:**
```typescript
const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
const [recipeSource, setRecipeSource] = useState<'all' | 'pantry' | 'community'>('all');
const [filters, setFilters] = useState({...});
```

---

### 5.4 Not Found Page
**File:** `/src/app/pages/NotFound.tsx`  
**Route:** `*` (catch-all)

Simple 404 page with navigation back to home.

---

## 6. Data Structure

### 6.1 Recipe Interface
**File:** `/src/app/data/recipes.ts`

```typescript
interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;          // minutes
  cookTime: number;          // minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  imageUrl: string;          // Unsplash URL
  dietary: {
    vegan: boolean;
    glutenFree: boolean;
    halal: boolean;
    nutFree: boolean;
  };
  appliances: string[];      // ['microwave'], ['stove'], ['none'], etc.
  category: string;          // 'breakfast', 'lunch', 'dinner', 'snack', 'soup'
  source: 'pantry' | 'community';
}
```

### 6.2 Recipe Database
**Total Recipes:** 18 (all vegetarian, no meat)

**Categories:**
- Breakfast: 3 recipes
- Lunch: 5 recipes
- Dinner: 6 recipes
- Snack: 3 recipes
- Soup: 1 recipe

**Appliance Distribution:**
- No cooking: 4 recipes
- Microwave only: 4 recipes
- Stove required: 8 recipes
- Multiple options: 2 recipes

**Example Recipes:**
1. Simple Rice & Beans Bowl (Easy, Stove, Vegan, 30min)
2. Microwave Mac & Cheese (Easy, Microwave, 13min)
3. Apple Cinnamon Oats (Easy, No-cook, Vegan, 5min prep)
4. Lentil Curry (Medium, Stove, Vegan, 40min)

### 6.3 Recipe Matching Algorithm
**Function:** `getRecipesByIngredients(userIngredients: string[])`

**Logic:**
1. Map each recipe to count ingredient matches
2. Filter recipes with at least 1 match
3. Sort by match count (descending)
4. Return sorted recipe array

**Matching Rules:**
- Case-insensitive comparison
- Partial matching (e.g., "tomato" matches "tomatoes")
- Bi-directional includes check

---

## 7. Animation System

### 7.1 GSAP Implementation

**Plugin:** ScrollTrigger (registered globally)

**Animation Types:**

#### **Scroll Animations (AnimatedContent)**
- Trigger: Element enters viewport at 85%
- Direction-based translation (50px)
- Fade from 0 to 1 opacity
- Duration: Customizable (default 1s)
- Easing: power3.out

#### **Menu Animations (BubbleMenu)**
- On mount only
- Scale from 0 to 1
- Stagger: 0.1s between bubbles
- Easing: back.out(1.7) for bounce effect
- Total animation time: ~0.8s

#### **Recipe Card Animations**
- Staggered entrance (0.1s × index)
- Fade-in from bottom
- Hover: Shadow increase + scale on image

### 7.2 Animation Cleanup
All GSAP animations have cleanup functions:
```typescript
return () => {
  animation.kill();
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.vars.trigger === element) {
      trigger.kill();
    }
  });
};
```

---

## 8. User Flow

### 8.1 Primary Flow (Ingredient-Based)
```
1. User lands on Home page
   ↓
2. Views hero with Pantry branding
   ↓
3. Scrolls to "Ready to Cook?" section
   ↓
4. Enters ingredients one by one (e.g., "rice", "beans", "tomato")
   ↓
5. Sees ingredients appear as removable badges
   ↓
6. Clicks "Find Recipes" button
   ↓
7. Navigates to Recipes page with ingredient state
   ↓
8. Sees recipes sorted by ingredient match
   ↓
9. Applies filters (dietary, appliances, time)
   ↓
10. Clicks recipe card to view full details
    ↓
11. Reads ingredients and instructions
    ↓
12. Closes modal or navigates back
```

### 8.2 Alternative Flow (Browse All)
```
1. User lands on Home page
   ↓
2. Clicks "Browse All Recipes" or Recipes navigation
   ↓
3. Views all 18 recipes in grid
   ↓
4. Applies filters as needed
   ↓
5. Selects recipe to view details
```

### 8.3 Community Flow
```
1. User lands on Home page
   ↓
2. Scrolls to Pantry Resources
   ↓
3. Clicks "Community Recipes" card
   ↓
4. Navigates to Recipes page with source filter = 'community'
   ↓
5. Views only community-submitted recipes
```

### 8.4 Share Recipe Flow (Future Feature)
```
1. User fills out "Share Your Recipe" form on Home
   ↓
2. Enters recipe details (name, ingredients, instructions, etc.)
   ↓
3. Clicks "Submit Recipe" button
   ↓
4. [Backend integration needed - currently frontend only]
   ↓
5. Recipe appears in Community Recipes section
```

---

## 9. Accessibility Features

### 9.1 Color Contrast
All color combinations meet WCAG AA standards:
- Coral (#E37861) on white: 4.5:1
- Sage (#5E7F64) on white: 4.8:1
- White text on Coral/Sage: 4.5:1+

### 9.2 Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order follows logical flow
- Enter key support for ingredient input
- Focus states on all buttons and links

### 9.3 Screen Reader Support
- Semantic HTML (nav, section, main)
- Alt text on all images
- ARIA labels where needed
- Proper heading hierarchy (h1, h2, h3)

### 9.4 Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly targets (minimum 44px)
- Readable font sizes on all devices

### 9.5 Video Captions
**Note:** Currently no video content, but design supports caption integration for future tutorial videos.

---

## 10. Features & Functionality

### 10.1 Implemented Features ✅

1. **Ingredient Matching System**
   - Fuzzy search algorithm
   - Case-insensitive matching
   - Partial word matching
   - Results sorted by relevance

2. **Multi-Layer Filtering**
   - Dietary restrictions (4 options)
   - Appliance availability (5 options)
   - Time constraints (3 options)
   - Recipe source (3 options: all, pantry, community)

3. **Interactive Recipe Cards**
   - Hover effects
   - Click-to-expand modal
   - Difficulty badges
   - Tag system
   - Metadata display

4. **Navigation System**
   - Animated bubble menu
   - Active state indication
   - Smooth scrolling
   - Route preservation

5. **Animation System**
   - Scroll-triggered content reveals
   - Staggered menu entrance
   - Smooth transitions
   - Performance-optimized

6. **External Integrations**
   - ASUCD Pantry website
   - Online ordering system
   - Notion inventory tracker
   - Unsplash image API

### 10.2 Planned Features 🔮

1. **Backend Integration**
   - User-submitted recipes storage
   - Recipe rating system
   - Comment functionality
   - Admin approval workflow

2. **Enhanced Search**
   - Full-text search across recipes
   - Category filtering
   - Difficulty sorting
   - Popularity ranking

3. **User Accounts (Optional)**
   - Save favorite recipes
   - Shopping list generator
   - Recipe collection
   - Personal notes

4. **Video Tutorials**
   - Step-by-step video guides
   - Closed captions
   - Thumbnail previews
   - Embedded YouTube/Vimeo

5. **Print & Share**
   - Print-friendly recipe format
   - Social media sharing
   - Email recipe to self
   - QR code generation

6. **Nutrition Information**
   - Calorie counts
   - Macronutrient breakdown
   - Allergen warnings
   - Serving size calculator

---

## 11. Routing Configuration

### 11.1 Route Structure
**File:** `/src/app/routes.ts`

```typescript
createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'recipes', Component: Recipes },
      { path: '*', Component: NotFound },
    ],
  },
])
```

### 11.2 State Passing
Routes use React Router's `location.state` for data passing:

**Home → Recipes:**
```typescript
navigate('/recipes', { 
  state: { 
    ingredients: ['rice', 'beans'],
    source: 'community' // optional
  } 
});
```

**Recipes Page Access:**
```typescript
const userIngredients = location.state?.ingredients || [];
const initialSource = location.state?.source || 'all';
```

---

## 12. Performance Considerations

### 12.1 Optimization Strategies

1. **Image Loading**
   - ImageWithFallback component for error handling
   - Lazy loading via Unsplash API parameters
   - Optimized image sizes (w=800)

2. **Animation Performance**
   - GSAP hardware acceleration
   - Cleanup on unmount
   - Debounced scroll triggers

3. **State Management**
   - useMemo for expensive computations
   - useEffect dependency optimization
   - Minimal re-renders

4. **Code Splitting**
   - React Router lazy loading ready
   - Component-based splitting
   - Route-based chunks

### 12.2 Bundle Size
- Tailwind CSS purging enabled
- Tree-shaking for unused components
- GSAP plugins loaded conditionally

---

## 13. Mobile Responsiveness

### 13.1 Breakpoint Strategy

**Mobile First Design:**
```css
/* Default: Mobile (< 640px) */
.menu-bubble { width: 48px; height: 48px; }

/* Tablet (768px+) */
@media (min-width: 768px) {
  .menu-bubble { width: 56px; height: 56px; }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  /* Enhanced spacing and sizing */
}
```

### 13.2 Mobile-Specific Features

1. **Touch Targets**
   - Minimum 44×44px for all interactive elements
   - Generous padding on buttons
   - Increased tap area for badges

2. **Navigation**
   - Sticky top menu (always accessible)
   - Scroll-to-top on route change
   - Mobile-optimized bubble sizes

3. **Forms**
   - Full-width inputs on mobile
   - Large touch-friendly buttons
   - Native keyboard support

4. **Content Layout**
   - Single column recipe grid on mobile
   - Stacked resource cards
   - Readable line lengths (max-w-3xl)

---

## 14. Testing Requirements

### 14.1 Functional Testing

**Core Features:**
- [ ] Ingredient addition and removal
- [ ] Recipe filtering (all combinations)
- [ ] Navigation between pages
- [ ] Recipe modal open/close
- [ ] Source filter toggle
- [ ] External link functionality

**Edge Cases:**
- [ ] Empty ingredient list
- [ ] No matching recipes
- [ ] All filters applied (zero results)
- [ ] Duplicate ingredient prevention
- [ ] Special characters in input

### 14.2 Cross-Browser Testing

**Target Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### 14.3 Performance Testing

**Metrics:**
- [ ] Initial page load < 3s
- [ ] Time to interactive < 5s
- [ ] Smooth animations (60fps)
- [ ] No layout shift (CLS < 0.1)
- [ ] Lighthouse score > 90

### 14.4 Accessibility Testing

**Tools:**
- [ ] WAVE browser extension
- [ ] axe DevTools
- [ ] Screen reader testing (NVDA/JAWS)
- [ ] Keyboard-only navigation
- [ ] Color contrast analyzer

---

## 15. Deployment & Environment

### 15.1 Build Configuration

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm run preview
```

### 15.2 Environment Variables (Future)

```env
VITE_API_URL=https://api.thepantry.ucdavis.edu
VITE_UNSPLASH_API_KEY=your_key_here
VITE_ANALYTICS_ID=UA-XXXXXXXX-X
```

### 15.3 Hosting Requirements

**Recommended Platforms:**
- Vercel (zero-config React support)
- Netlify (easy deployment)
- GitHub Pages (static hosting)

**Requirements:**
- Node.js 18+
- npm or yarn
- Modern build tools (Vite)

---

## 16. Content Management

### 16.1 Recipe Content

**Current System:** Hardcoded in `/src/app/data/recipes.ts`

**Adding New Recipes:**
1. Open recipes.ts
2. Add new Recipe object to array
3. Ensure all required fields are filled
4. Use Unsplash for imageUrl
5. Verify dietary flags are accurate
6. Test filtering functionality

**Recipe Approval Process (Future):**
1. User submits via form
2. Stored in database (pending status)
3. Admin reviews via dashboard
4. Approved recipes appear on site
5. Rejected recipes notify submitter

### 16.2 Image Management

**Current:** Unsplash API URLs hardcoded  
**Future:** Upload to CDN with optimization

**Image Requirements:**
- Minimum 800px width
- 4:3 or 16:9 aspect ratio
- Food/ingredient focus
- High quality, well-lit

---

## 17. Brand Voice & Messaging

### 17.1 Tone Guidelines

**Personality:**
- Warm and supportive (like a helpful friend)
- Encouraging but not condescending
- Student-focused language
- No shame or judgment

**Language Examples:**

✅ Good:
- "Transform your food haul into delicious meals"
- "We understand college life can be challenging"
- "Make the most of what you have"

❌ Avoid:
- "Don't waste food!"
- "Anyone can cook"
- "Simple recipes for beginners"

### 17.2 Copy Guidelines

**Headers:**
- Use title case
- Keep under 60 characters
- Action-oriented when possible

**Body Text:**
- Short paragraphs (2-3 sentences)
- Bullet points for lists
- Conversational but clear

**CTAs:**
- Action verbs (Find, Browse, Share)
- Clear value proposition
- Encouraging language

---

## 18. Success Metrics

### 18.1 Key Performance Indicators (KPIs)

**User Engagement:**
- Recipe views per session
- Time spent on recipe details
- Ingredient searches per week
- Filter usage rate

**Content Performance:**
- Most popular recipes
- Community recipe submissions
- Recipe completion rate
- Share/save actions

**Technical Metrics:**
- Page load time
- Error rate
- Mobile vs desktop usage
- Browser compatibility issues

### 18.2 Analytics Implementation (Future)

**Recommended Tools:**
- Google Analytics 4
- Hotjar (heatmaps)
- Sentry (error tracking)
- Vercel Analytics (performance)

**Event Tracking:**
```javascript
// Example events to track
trackEvent('ingredient_added', { ingredient: 'rice' });
trackEvent('recipe_viewed', { recipe_id: 1, title: 'Rice & Beans' });
trackEvent('filter_applied', { filter_type: 'dietary', value: 'vegan' });
trackEvent('recipe_submitted', { category: 'community' });
```

---

## 19. Security & Privacy

### 19.1 Current Implementation

**Privacy:**
- No user tracking
- No cookies (except session)
- No personal data collection
- No login required

**Security:**
- HTTPS required (production)
- XSS protection via React
- Input sanitization
- CSP headers recommended

### 19.2 Future Considerations

**If Adding User Accounts:**
- GDPR compliance (EU users)
- Data encryption at rest
- Secure password hashing
- Two-factor authentication option

**If Adding Recipe Submission:**
- Content moderation system
- Spam prevention (rate limiting)
- Image upload scanning
- User reporting mechanism

---

## 20. Maintenance & Updates

### 20.1 Regular Updates

**Weekly:**
- Monitor for broken links
- Check Unsplash API limits
- Review user feedback (if collected)

**Monthly:**
- Add new recipes (2-4 per month)
- Update seasonal content
- Review analytics data
- Dependency security updates

**Quarterly:**
- Design refresh considerations
- Feature roadmap review
- Performance audit
- Accessibility audit

### 20.2 Content Calendar

**Fall Quarter (Sep-Nov):**
- Back-to-school recipes
- Budget-friendly meals
- Quick dorm recipes

**Winter Quarter (Dec-Feb):**
- Comfort food focus
- Warm soups and stews
- Holiday-inspired recipes

**Spring Quarter (Mar-May):**
- Fresh produce recipes
- Lighter meals
- Meal prep ideas

**Summer (Jun-Aug):**
- No-cook recipes
- Cold dishes
- Snack-focused content

---

## 21. Support & Documentation

### 21.1 User Documentation

**Help Topics:**
- How to search by ingredients
- Understanding dietary filters
- Appliance requirement guide
- Submitting community recipes
- Finding The Pantry location

**FAQ Page (Future):**
- What ingredients does The Pantry have?
- Can I suggest new recipes?
- Are all recipes vegetarian?
- How do I report an issue?

### 21.2 Developer Documentation

**Code Comments:**
- Component purpose and props
- Complex algorithm explanations
- Animation timing rationale
- API integration notes

**README Files:**
- Installation instructions
- Development setup
- Build commands
- Contributing guidelines

---

## 22. Platform Migration Guide

### 22.1 For iOS/Android Native App

**Design Translation:**
- Convert Tailwind classes to native styling
- Use React Native for component structure
- Implement native animations (Reanimated)
- Adapt navigation to tab-based pattern

**Key Adaptations:**
- ScrollTrigger → Native scroll listeners
- GSAP → React Native Animated API
- Routing → React Navigation
- Images → Native image optimization

### 22.2 For Backend CMS (WordPress, Strapi, etc.)

**Data Structure:**
- Create Recipe custom post type
- Add custom fields for all Recipe properties
- Create taxonomy for tags, categories
- Implement filtering via queries

**Frontend Integration:**
- REST API endpoint for recipes
- GraphQL option (Strapi)
- Real-time filtering on frontend
- Maintain current UI/UX

### 22.3 For Static Site Generator (Next.js, Gatsby)

**Advantages:**
- Server-side rendering (SEO)
- Static recipe pages
- Image optimization
- Faster initial load

**Implementation:**
```
/pages/index.tsx          → Home
/pages/recipes/index.tsx  → Recipes list
/pages/recipes/[id].tsx   → Recipe detail
/components/*             → Same structure
```

---

## 23. Known Limitations & Constraints

### 23.1 Current Limitations

1. **No Backend:**
   - Community recipes not actually saved
   - No user accounts or favorites
   - No real-time updates
   - No analytics tracking

2. **Static Recipe Data:**
   - Recipes hardcoded in TypeScript
   - Manual updates required
   - No admin dashboard
   - No A/B testing capability

3. **Limited Search:**
   - Ingredient matching only
   - No full-text search
   - No fuzzy matching improvements
   - No search suggestions

4. **Mobile Experience:**
   - No PWA features
   - No offline support
   - No push notifications
   - No native app feeling

### 23.2 Technical Debt

1. **Component Splitting:**
   - Some components could be smaller
   - Duplicate code in recipe rendering
   - Filter logic could be extracted

2. **Type Safety:**
   - Some 'any' types used
   - Props could be more specific
   - Better error type definitions

3. **Testing:**
   - No unit tests written
   - No integration tests
   - No E2E test suite
   - Manual testing only

---

## 24. Glossary

**Terms & Definitions:**

- **Pantry Recipes:** Official recipes curated by ASUCD Pantry team
- **Community Recipes:** User-submitted recipes (future feature)
- **Appliance Filter:** Filter based on available cooking equipment
- **Ingredient Matching:** Algorithm that finds recipes containing user's ingredients
- **Dietary Flags:** Boolean indicators for vegan, gluten-free, halal, nut-free
- **GSAP:** GreenSock Animation Platform - JavaScript animation library
- **ScrollTrigger:** GSAP plugin for scroll-based animations
- **Bubble Menu:** Circular navigation design with three bubbles
- **AnimatedContent:** Wrapper component for scroll animations
- **Recipe Card:** Individual recipe preview in grid layout
- **Recipe Modal:** Full-screen detail view of selected recipe

---

## 25. Appendix

### 25.1 Color Palette Reference

```css
/* Primary Colors */
#E37861 - Pantry Coral (CTA buttons, accents)
#EEB467 - Pantry Gold (secondary buttons, highlights)
#DDBE86 - Pantry Sand (borders, badges)
#F4E8D0 - Pantry Cream (backgrounds, soft sections)
#5E7F64 - Pantry Sage (primary text, main buttons)

/* Neutral Colors */
#FFFFFF - White (card backgrounds)
#000000 - Black (text, rarely used)
#1A1A1A - Dark gray (main text)
#717182 - Medium gray (muted text)
#F3F3F5 - Light gray (input backgrounds)

/* Utility Colors */
#D4183D - Red (destructive actions, errors)
rgba(0,0,0,0.1) - Border color
```

### 25.2 Typography Scale

```css
/* Font Families */
--font-header: 'Yellowtail', cursive
--font-body: 'Rubik', sans-serif

/* Font Sizes (Desktop) */
text-4xl: 36px    /* Page titles */
text-2xl: 24px    /* Section headings */
text-xl: 20px     /* Subsections */
text-lg: 18px     /* Large body */
text-base: 16px   /* Default body */
text-sm: 14px     /* Small text */
text-xs: 12px     /* Captions */

/* Font Weights */
300 - Light
400 - Regular
500 - Medium (headings)
600 - Semibold
700 - Bold
```

### 25.3 Spacing System

```css
/* Tailwind Spacing Scale */
px-2: 8px
px-4: 16px
px-6: 24px
px-8: 32px
px-12: 48px

py-4: 16px (vertical)
py-8: 32px
py-16: 64px

gap-2: 8px (flexbox/grid)
gap-4: 16px
gap-8: 32px

mb-4: 16px (margin-bottom)
mb-6: 24px
mb-8: 32px
mb-12: 48px
```

### 25.4 Component Sizing

```css
/* Recipe Cards */
min-height: auto
max-width: 400px
border-radius: 16px (rounded-2xl)

/* Images */
aspect-ratio: 16:9
object-fit: cover
height: 192px (h-48)

/* Buttons */
padding: 24px 32px (py-6 px-8)
border-radius: 12px (rounded-xl)
min-height: 48px (touch target)

/* Input Fields */
padding: 24px 16px (py-6 px-4)
border-width: 2px
border-radius: 12px
```

### 25.5 Animation Timings

```css
/* Durations */
0.3s - Hover transitions
0.6s - Bubble menu entrance
1.0s - Scroll animations (default)
1.2s - Hero entrance

/* Easing Functions */
ease-out - Most animations
back.out(1.7) - Bubble menu
power3.out - Scroll animations

/* Delays */
0.1s - Stagger increment
0.2s - Section delays
```

### 25.6 External Resources

**Documentation:**
- [React Router Docs](https://reactrouter.com/)
- [GSAP Documentation](https://greensock.com/docs/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

**Assets:**
- [Unsplash API](https://unsplash.com/developers)
- [Google Fonts](https://fonts.google.com/)
- [ASUCD Pantry](https://thepantry.ucdavis.edu/)

**Design:**
- [Figma Community](https://www.figma.com/community)
- [Dribbble Inspiration](https://dribbble.com/)
- [Coolors Palette Generator](https://coolors.co/)

---

## Document Version

**Version:** 1.0  
**Last Updated:** February 21, 2026  
**Author:** The Pantry Development Team  
**Review Cycle:** Quarterly  
**Next Review:** May 2026

---

## Change Log

**v1.0 (Feb 2026)**
- Initial PRD creation
- Complete component breakdown
- Full feature documentation
- Design system specification
- Migration guide included

---

## Contact & Support

**Project Lead:** ASUCD Technology Team  
**Website:** https://thepantry.ucdavis.edu  
**Email:** pantry@asucd.ucdavis.edu  
**GitHub:** (Repository URL when available)

---

*This document serves as the single source of truth for The Pantry Recipe Web Application. All platform migrations, redesigns, and feature additions should reference this PRD for consistency and brand alignment.*
