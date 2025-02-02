import { useEffect, useState, useDebugValue } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(
    pizzaOfTheDay
      ? `Pizza of the day is ${pizzaOfTheDay.name}`
      : "No pizza of the day",
  );

  async function fetchPizzaOfTheDay() {
    const response = await fetch(` ${apiUrl}/api/pizza-of-the-day`);
    const data = await response.json();

    setPizzaOfTheDay(data);
  }

  useEffect(() => {
    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
