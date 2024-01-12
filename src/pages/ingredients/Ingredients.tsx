import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardIngredients from '../../components/cardIngredients';

const Ingredients = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BACKEND}/Ingredients`,
          {
            headers: new Headers({
              'ngrok-skip-browser-warning': '69420',
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleNavigate = (path: any) => {
    navigate(path);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex justify-end p-4">
        <button
          onClick={() => handleNavigate('/ingredients/create')}
          className="p-2 bg-blue-500 hover:bg-blue-400 rounded-md shadow-md cursor-pointer text-white font-semibold"
        >
          Add Ingredient to recipe
        </button>
      </div>
      <div className="flex flex-wrap justify-around">
        {data.map((ingredient: any, index: number) => (
          <CardIngredients
            key={index}
            ingredient={ingredient}
            onNavigate={() => handleNavigate(`/ingredients/${ingredient.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
