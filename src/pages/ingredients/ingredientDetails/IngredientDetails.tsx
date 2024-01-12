// Create a component similar to Recipe.tsx for Ingredients
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IngredientDetails = () => {
  const [ingredient, setIngredient] = useState<any>({
    id: '',
    name: '',
    amount: '',
    isLiquid: false,
  });
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BACKEND}/Ingredients/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      toast.success('Ingredient deleted with success!');
      navigate('/ingredients');
    } catch (error) {
      console.error('Failed to delete the ingredient:', error);
      toast.error('Failed to delete the ingredient');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BACKEND}/Ingredients/${id}`,
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

      setIngredient(result);
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
              {ingredient.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-200">
              Amount: {ingredient.amount} {ingredient.isLiquid ? 'ml' : 'g'}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {id}
                </dd>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span
                    className={`inline-block ${
                      ingredient.isLiquid ? 'bg-blue-100' : 'bg-orange-100'
                    } rounded-full px-2 py-1 text-sm font-semibold text-indigo-700 mr-2 mb-2`}
                  >
                    Is liquid: {ingredient.isLiquid ? 'Yes' : 'No'}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="flex justify-center space-x-4 p-4">
          <button
            onClick={() => navigate('/ingredients/')}
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Back
          </button>
          <button
            onClick={() => navigate(`/ingredients/edit/${id}`)}
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

export default IngredientDetails;
