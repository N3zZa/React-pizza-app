import React, { useState, useEffect } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import "./scss/app.scss";

function App() {
  const [pizzaCount, setPizzaCount] = useState(0);
  const [items, setItems] = useState([]);


  const addPizza = () => {
    setPizzaCount(pizzaCount + 1);
  };

  useEffect(() => {
    try {
       fetch("https://62d53c2115ad24cbf2c243ef.mockapi.io/items")
         .then((res) => res.json())
         .then((json) => setItems(json));
    } catch (error) {
      alert('Что-то пошло не так :(')
      console.error(error)
    }
  }, []);

   

  return (
    <div className="App">
      <div className="wrapper">
        <Header pizzaCount={pizzaCount} />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {items.map((item) => (
                <PizzaBlock
                  {...item}
                  pizzaCount={pizzaCount}
                  addPizza={addPizza}
                  key={item.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
