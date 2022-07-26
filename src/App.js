import React, { useState } from "react";

import Header from "./components/Header";
import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import { Route, Routes } from "react-router-dom";

function App() {
  const [pizzaCount, setPizzaCount] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  

   const addPizza = () => {
     setPizzaCount(pizzaCount + 1);
   };
   const deletePizza = () => {
    setPizzaCount(pizzaCount > 0 ? pizzaCount - 1 : pizzaCount);
   }

  return (
    <div className="App">
      <div className="wrapper">
        <Header
          pizzaCount={pizzaCount}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Routes>
          <Route
            path=""
            element={
              <Home
                addPizza={addPizza}
                pizzaCount={pizzaCount}
                searchValue={searchValue}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                pizzaCount={pizzaCount}
                addPizza={addPizza}
                deletePizza={deletePizza}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
