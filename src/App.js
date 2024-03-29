import React from "react";

import Header from "./components/Header";
import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <div className="wrapper">
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
      </div>
    </div>
  );
}

export default App;
