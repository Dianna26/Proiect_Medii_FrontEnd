import React from 'react';

const Card = ({ recipe, onNavigate, key }: any) => {
  return (
    <div className="flex flex-col max-h-max w-96" key={key}>
      <div className="max-w-sm rounded-md overflow-hidden shadow-lg m-4 bg-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{recipe.name}</div>
          <p className="text-gray-700 text-base truncate">{recipe.steps}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-indigo-100 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700 mr-2 mb-2">
            Portions: {recipe.portions}
          </span>
          <span className="inline-block bg-indigo-100 rounded-full px-3 py-1 text-sm font-semibold text-indigo-700 mr-2 mb-2">
            Difficulty: {recipe.difficulty.name}
          </span>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <button
            className="p-2 bg-blue-500 hover:bg-blue-400 rounded-md text-white font-bold py-2 px-4 transition-colors duration-150"
            onClick={() => onNavigate()}
          >
            View Details
          </button>
          <span className="inline-block bg-red-100 rounded-full px-3 py-1 text-sm font-semibold text-red-700">
            {recipe.nutritionalValues.calories} kcal
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
