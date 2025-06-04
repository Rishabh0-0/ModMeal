import IngredientCard from "./IngredientCard";
import useApi from "../../utils/useApi";

const IngredientsList = ({ category }) => {
  const {
    data: ingredients,
    loading,
    error,
  } = useApi(
    `http://localhost:3000/api/v1/ingredients?category=${category}`,
    []
  );

  if (loading) return <p>Loading Ingredients...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (ingredients.length === 0) {
    return <p>No ingredients found for this category.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {ingredients.map((ingredient) => (
        <IngredientCard key={ingredient._id} name={ingredient.name} />
      ))}
    </ul>
  );
};

export default IngredientsList;
