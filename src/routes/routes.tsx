import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Home from '../pages/home';
import Header from '../components/layout/header';
import Recipe from '../pages/recipe';
import CreateRecipe from '../pages/recipe/createRecipe';
import EditRecipe from '../pages/recipe/editRecipe';
import Ingredients from '../pages/ingredients';
import IngredientDetails from '../pages/ingredients/ingredientDetails';
import CreateIngredients from '../pages/ingredients/createIngredients';
import EditIngredient from '../pages/ingredients/editIngredients/editIngredients';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/ingredients/" element={<Ingredients />} />
      </Route>
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/recipe/create" element={<CreateRecipe />} />
      <Route path="/recipe/edit/:id" element={<EditRecipe />} />

      <Route path="/ingredients/:id" element={<IngredientDetails />} />
      <Route path="/ingredients/create" element={<CreateIngredients />} />
      <Route path="/ingredients/edit/:id" element={<EditIngredient />} />
    </Route>
  )
);
