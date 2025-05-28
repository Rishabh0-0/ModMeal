import React from "react";
import AddBtn from "../../UI/AddBtn";

const IngredientCard = ({ name }) => {
  const addToIngredients = () => {
    console.log("Ingredient added");
  };

  return (
    <li className="w-40 h-12 bg-teal-100 rounded-xl flex justify-between items-center hover:shadow-md">
      <h2 className="ml-4 text-sm font-medium">{name}</h2>
      <AddBtn onClick={addToIngredients} />
    </li>
  );
};

export default IngredientCard;
