import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IngredientInput from '../../../components/IngredientsInput';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  isLiquid: boolean;
}

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<{
    name: string;
    ingredients: Ingredient[];
    steps: string;
    nutritionalValues: {
      calories: number;
      proteins: number;
      carbohydrates: number;
      fats: number;
    };
    portions: number;
    difficultyID: number;
  }>({
    name: '',
    ingredients: [{ id: uuidv4(), name: '', amount: 0, isLiquid: false }],
    steps: '',
    nutritionalValues: {
      calories: 0,
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
    },
    portions: 0,
    difficultyID: 1,
  });

  const handleInputChange = (e: any) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newIngredients = [...recipe.ingredients];
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    newIngredients[index] = { ...newIngredients[index], [name]: newValue };
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredientField = () => {
    setRecipe({
      ...recipe,
      ingredients: [
        ...recipe.ingredients,
        { id: uuidv4(), name: '', amount: 0, isLiquid: false },
      ],
    });
  };

  const handleNutritionalChange = (e: any) => {
    setRecipe({
      ...recipe,
      nutritionalValues: {
        ...recipe.nutritionalValues,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BACKEND}/Recipes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipe),
        }
      );
      if (response.ok) {
        // Handle success

        toast.success('Recipe created with success!');
        navigate('/');
      } else {
        // Handle error
        toast.error('Failed to submit recipe');
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
      toast.error('Error submitting recipe');
    }
  };

  return (
    <>
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="sm:max-w-lg max-w-xs">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Recipe Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={recipe.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            {recipe.ingredients.map((ingredient: Ingredient, index: number) => {
              return (
                <IngredientInput
                  key={ingredient.id}
                  ingredient={ingredient}
                  index={index}
                  handleIngredientChange={handleIngredientChange}
                />
              );
            })}
            <button
              type="button"
              onClick={addIngredientField}
              className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Ingredient
            </button>

            <div>
              <label
                htmlFor="steps"
                className="block text-sm font-medium text-gray-700"
              >
                Preparation Steps
              </label>
              <textarea
                name="steps"
                id="steps"
                value={recipe.steps}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="calories"
                  className="block text-sm font-medium text-gray-700"
                >
                  Calories
                </label>
                <input
                  type="number"
                  name="calories"
                  id="calories"
                  value={recipe.nutritionalValues.calories}
                  onChange={handleNutritionalChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="proteins"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proteins
                </label>
                <input
                  type="number"
                  name="proteins"
                  id="proteins"
                  value={recipe.nutritionalValues.proteins}
                  onChange={handleNutritionalChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="carbohydrates"
                  className="block text-sm font-medium text-gray-700"
                >
                  Carbohydrates
                </label>
                <input
                  type="number"
                  name="carbohydrates"
                  id="carbohydrates"
                  value={recipe.nutritionalValues.carbohydrates}
                  onChange={handleNutritionalChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="fats"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fats
                </label>
                <input
                  type="number"
                  name="fats"
                  id="fats"
                  value={recipe.nutritionalValues.fats}
                  onChange={handleNutritionalChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="portions"
                className="block text-sm font-medium text-gray-700"
              >
                Portions
              </label>
              <input
                type="number"
                name="portions"
                id="portions"
                value={recipe.portions}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="difficultyID"
                className="block text-sm font-medium text-gray-700"
              >
                Difficulty
              </label>
              <input
                type="number"
                name="difficultyID"
                id="difficultyID"
                value={recipe.difficultyID}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Recipe
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRecipe;
