import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recipe = () => {
  const [recipe, setRecipe] = useState<any>({
    id: '',
    name: '',
    steps: '',
    portions: '',
    difficulty: { name: '' },
    ingredients: [],
  });
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BACKEND}/Recipes/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      toast.success('Recipe deleted with success!');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete the recipe:', error);
      toast.error('Failed to delete the recipe');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BACKEND}/Recipes/${id}`,
        {
          headers: new Headers({
            'ngrok-skip-browser-warning': '69420',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      setRecipe(result);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 flex justify-center items-center h-screen">
      <div className="max-w-xl w-full">
        <div className="bg-blue-500 shadow overflow-hidden sm:rounded-lg mb-4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-white">
              {recipe.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-200">
              {recipe.steps}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Portions</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {recipe.portions}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Difficulty
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {recipe.difficulty.name}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Ingredients
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul>
                    {recipe.ingredients.map(
                      (ingredient: any, index: number) => (
                        <li key={index}>
                          {ingredient.name}: {ingredient.amount}{' '}
                          {ingredient.isLiquid ? 'ml' : 'g'}
                        </li>
                      )
                    )}
                  </ul>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Nutritional Values
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul>
                    <li>Calories: {recipe.nutritionalValues.calories} kcal</li>
                    <li>Proteins: {recipe.nutritionalValues.proteins} g</li>
                    <li>
                      Carbohydrates: {recipe.nutritionalValues.carbohydrates} g
                    </li>
                    <li>Fats: {recipe.nutritionalValues.fats} g</li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="flex justify-center space-x-4 p-4">
          <button
            onClick={() => navigate('/')}
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back
          </button>
          <button
            onClick={() => navigate(`/recipe/edit/${recipe.id}`)}
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default Recipe;
