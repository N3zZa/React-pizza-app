import React, { createContext, useState } from "react";

import Header from "./components/Header";
import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import { Route, Routes } from "react-router-dom";

export const SearchContext = createContext()

function App() {
  const [searchValue, setSearchValue] = useState('');
  


  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider
          value={{
            searchValue,
            setSearchValue,
          }}
        >
          <Header />
          <Routes>
            <Route
              path=""
              element={
                <Home
                />
              }
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
