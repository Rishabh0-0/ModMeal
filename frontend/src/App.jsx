import React from "react";
import IngredientCard from "./components/IngredientCard";
import IngredientsList from "./components/IngredientsList";
import IngredientsCategorized from "./components/IngredientsCategorized";

const App = () => {
  return (
    <div className="p-4">
      <IngredientsCategorized />
    </div>
  );
};

export default App;
