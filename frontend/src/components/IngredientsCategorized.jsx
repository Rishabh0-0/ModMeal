import React, { useEffect, useState } from "react";
import axios from "axios";
import IngredientsList from "./IngredientsList";

const IngredientsCategorized = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/ingredients/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <ul>
      {categories.map((category) => (
        <li className="shadow-lg rounded-md p-4" key={category}>
          <h2 className="font-bold text-teal-800 p-2">{category}</h2>
          <IngredientsList category={category} />
        </li>
      ))}
    </ul>
  );
};

export default IngredientsCategorized;
