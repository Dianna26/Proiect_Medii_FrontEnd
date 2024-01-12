import React from 'react';

const CardIngredients = ({ ingredient, onNavigate, key }: any) => {
  return (
    <div className="flex flex-col max-h-max w-96" key={key}>
      <div className="max-w-sm rounded-md overflow-hidden shadow-lg m-4 bg-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{ingredient.name}</div>
          <p className="text-gray-700 text-base truncate">
            {ingredient.amount}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span
            className={`inline-block ${
              ingredient.isLiquid ? 'bg-blue-100' : 'bg-orange-100'
            } rounded-full px-2 py-1 text-sm font-semibold text-indigo-700 mr-2 mb-2`}
          >
            Is liquid: {ingredient.isLiquid ? 'Yes' : 'No'}
          </span>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <button
            className="p-2 bg-blue-500 hover:bg-blue-400 rounded-md text-white font-bold py-2 px-4 transition-colors duration-150"
            onClick={() => onNavigate()}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardIngredients;
