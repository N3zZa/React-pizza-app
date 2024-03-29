import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice"
import cartSlice from "./slices/cartSlice"
import pizzaSlice from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filterReducer: filterSlice,
    cartReducer: cartSlice,
    pizzaReducer: pizzaSlice, 
  },
});