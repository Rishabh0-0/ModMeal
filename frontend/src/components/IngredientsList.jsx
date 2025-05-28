import axios from "axios";
import React, { useEffect, useState } from "react";
import IngredientCard from "./IngredientCard";

const IngredientsList = () => {
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/ingredients")
      .then((res) => setIngredients(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/ingredients/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul className="flex flex-col gap-2">
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient._id} name={ingredient.name} />
      ))}
      {categories.map((category) => (
        <h1>{category}</h1>
      ))}
    </ul>
  );
};

export default IngredientsList;
