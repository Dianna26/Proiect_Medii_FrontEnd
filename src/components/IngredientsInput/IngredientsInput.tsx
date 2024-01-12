import React from "react";
import { Ingredient } from "../../pages/recipe/createRecipe";

interface IngredientInputProps {
  ingredient: Ingredient;
  index: number;
  handleIngredientChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({
  ingredient,
  index,
  handleIngredientChange,
}) => {
  return (
    <div key={index} className="grid grid-cols-3 gap-4">
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
          onChange={(e) => handleIngredientChange(index, e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          onChange={(e) => handleIngredientChange(index, e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
          onChange={(e) => handleIngredientChange(index, e)}
          className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
};

export default IngredientInput;
