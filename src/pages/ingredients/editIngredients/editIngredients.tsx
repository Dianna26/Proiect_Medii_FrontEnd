import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Ingredient } from '../../recipe/createRecipe';

const EditIngredient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ingredient, setIngredient] = useState<Ingredient>({
    id: '',
    name: '',
    amount: 0,
    isLiquid: false,
  });
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      toast.error('Failed to load recipe');
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const fetchIngredient = async () => {
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
      } catch (error) {
        toast.error('Failed to load ingredient');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchIngredient();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setIngredient({ ...ingredient, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BACKEND}/Ingredients/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ingredient),
        }
      );

      if (response.ok) {
        toast.success('Ingredient updated with success!');
        navigate(`/ingredients/${id}`);
      } else {
        toast.error('Failed to update ingredient');
      }
    } catch (error) {
      console.error('Error updating ingredient:', error);
      toast.error('Error updating ingredient');
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="sm:max-w-lg max-w-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
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
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update Ingredient
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
  );
};

export default EditIngredient;
