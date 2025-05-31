import IngredientsList from "./IngredientsList";
import useApi from "../utils/useApi";

const IngredientsCategorized = () => {
  const {
    data: categories,
    loading,
    error,
  } = useApi("http://localhost:3000/api/v1/ingredients/categories", []);

  if (loading) return <p>Categories are loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (categories.length === 0) {
    return <p>No category defined.</p>;
  }

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
