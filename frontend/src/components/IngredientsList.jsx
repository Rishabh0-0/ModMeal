import axios from "axios";
import React, { useEffect, useState } from "react";
import IngredientCard from "./IngredientCard";

const IngredientsList = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/ingredients")
      .then((res) => setIngredients(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul className="flex flex-col gap-2">
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient._id} name={ingredient.name} />
      ))}
    </ul>
  );
};

export default IngredientsList;
