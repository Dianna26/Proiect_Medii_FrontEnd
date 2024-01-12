import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card';

const Home = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const data = await response.json();
        setRecipes(data);
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

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="p-2 mt-2 bg-blue-500 hover:bg-blue-400 rounded-md shadow-md cursor-pointer text-white font-semibold"
          >
            Reload
          </button>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex justify-end p-4">
        <button
          onClick={() => handleNavigate('/recipe/create')}
          className="p-2 bg-blue-500 hover:bg-blue-400 rounded-md shadow-md cursor-pointer text-white font-semibold"
        >
          Add Recipe
        </button>
      </div>
      <div className="flex flex-wrap justify-around">
        {recipes.map((recipe: any, index: number) => (
          <Card
            key={recipe.id}
            recipe={recipe}
            onNavigate={() => handleNavigate(`/recipe/${recipe.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
