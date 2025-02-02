import Pizza from "../Pizza";
import { useEffect, useState, useContext } from "react";
import Cart from "../Cart";
import { CartContext } from "../contexts";
import { createLazyFileRoute } from "@tanstack/react-router";
const apiUrl = import.meta.env.VITE_API_URL;
export const Route = createLazyFileRoute("/order")({
  component: Order,
});

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Order() {
  // const pizzaType="Pepperoni";
  // const pizzaSize="Large";
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [pizzaType, setPizzaType] = useState("The Barbecue Chicken Pizza");
  const [pizzaSize, setPizzaSize] = useState("L");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  let price, selectedPizza;
  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizza.name === pizzaType);
    price = intl.format(selectedPizza?.sizes[pizzaSize]);
  }

  async function fetchPizzaTypes() {
    const response = await fetch(`${apiUrl}/api/pizzas`);
    const data = await response.json();
    setPizzaTypes(data);
    setLoading(false);
  }

  async function checkout() {
    setLoading(true);
    await fetch(`${apiUrl}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    setCart([]);
    setLoading(false);
  }

  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  function addToCart() {
    setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
  }

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form action={addToCart}>
          <div>
            <div>
              <label htmlFor="pizzaType">Pizza Type:</label>
              <select
                name="pizzaType"
                id="pizzaType"
                value={pizzaType}
                onChange={(e) => setPizzaType(e.target.value)}
              >
                {loading ? (
                  <option value="loading">Loading...</option>
                ) : (
                  pizzaTypes.map((pizza) => (
                    <option key={pizza.name} value={pizza.name}>
                      {pizza.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div>
                <span>
                  <input
                    type="radio"
                    name="pizza-size"
                    id="small"
                    value="S"
                    checked={pizzaSize === "S"}
                    onChange={(e) => {
                      setPizzaSize(e.target.value);
                    }}
                  />
                  <label htmlFor="small">Small</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="pizza-size"
                    id="medium"
                    value="M"
                    checked={pizzaSize === "M"}
                    onChange={(e) => {
                      setPizzaSize(e.target.value);
                    }}
                  />
                  <label htmlFor="medium">Medium</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="pizza-size"
                    id="large"
                    value="L"
                    checked={pizzaSize === "L"}
                    onChange={(e) => {
                      setPizzaSize(e.target.value);
                    }}
                  />
                  <label htmlFor="large">Large</label>
                </span>
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          <div className="order-pizza">
            <Pizza
              name={selectedPizza?.name}
              description={selectedPizza?.description}
              image={selectedPizza?.image}
            />
            <p>{price}</p>
          </div>
        </form>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Cart cart={cart} checkout={checkout} />
      )}
    </div>
  );
}
