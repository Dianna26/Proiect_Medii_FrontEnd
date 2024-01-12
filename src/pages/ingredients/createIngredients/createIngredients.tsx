// Create a component similar to CreateRecipe.tsx for Ingredients
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Ingredient } from '../../recipe/createRecipe';

const CreateIngredients = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState<Ingredient>({
    id: uuidv4(),
    name: '',
    amount: 0,
    isLiquid: false,
  });
  const [selectedRecipeId, setSelectedRecipeId] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BACKEND}/Recipes`,
          {
            headers: new Headers({
              'ngrok-skip-browser-warning': '69420',
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const recipes = await response.json();
        setRecipes(recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        toast.error('Error fetching recipes');
      }
    };

    fetchRecipes();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (name === 'recipeId') {
      setSelectedRecipeId(value);
    } else {
      const newValue = type === 'checkbox' ? checked : value;
      setIngredient({ ...ingredient, [name]: newValue });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BACKEND}/Ingredients/${selectedRecipeId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ingredient),
        }
      );
      if (response.ok) {
        // Handle success
        toast.success('Ingredient created with success!');
        navigate('/ingredients');
      } else {
        // Handle error
        toast.error('Failed to submit ingredient');
      }
    } catch (error) {
      console.error('Error submitting ingredient:', error);
      toast.error('Error submitting ingredient');
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="sm:max-w-lg max-w-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="recipeId"
              className="block text-sm font-medium text-gray-700"
            >
              Select Recipe
            </label>
            <select
              name="recipeId"
              id="recipeId"
              value={selectedRecipeId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select a recipe</option>
              {recipes.map((recipe: any) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Ingredient Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={ingredient.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={ingredient.amount}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label
              htmlFor="isLiquid"
              className="block text-sm font-medium text-gray-700"
            >
              Is Liquid
            </label>
            <input
              type="checkbox"
              name="isLiquid"
              id="isLiquid"
              checked={ingredient.isLiquid}
              onChange={handleInputChange}
              className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Ingredient
          </button>
          <button
            onClick={() => navigate('/ingredients/')}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredients;
