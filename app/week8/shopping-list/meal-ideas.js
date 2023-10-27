import React, { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [message, setMessage] = useState(
    ingredient ? `Meal ideas found for ${ingredient}:` : "Select an item to see meal ideas"
  );

  async function loadMeals() {
    if (ingredient) {
      const newMeals = await fetchMealIdeas(ingredient);
      setMeals(newMeals);

      if (newMeals && newMeals.length > 0) {
        setMessage(`Meal ideas found for ${ingredient}:`);
      } else {
        setMessage(`No meal ideas found for ${ingredient}.`);
      }
    }
  }

  useEffect(() => {
    loadMeals();
  }, [ingredient]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Meal Ideas</h1>
      <p className="mb-2">{message}</p>
      {meals && meals.length > 0 && (
        <ul className="max-w-md">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="bg-gray-500 hover:bg-gray-600 cursor-pointer m-2 p-2"
            >
              {meal.strMeal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
