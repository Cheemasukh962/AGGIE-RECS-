import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';
import { Recipes } from './pages/Recipes';
import { Community } from './pages/Community';
import { ShareRecipe } from './pages/ShareRecipe';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { path: 'signin', Component: SignIn },
      { index: true, Component: Home },
      { path: 'recipes', Component: Recipes },
      { path: 'community', Component: Community },
      { path: 'community/share', Component: ShareRecipe },
      { path: '*', Component: NotFound },
    ],
  },
]);