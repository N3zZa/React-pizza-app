import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, pageCount } = params;
  const { data } = await axios.get(
    `https://62d53c2115ad24cbf2c243ef.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
        state.status = "loading";
        state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
        state.items = action.payload
        state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
        state.status = "error";
        state.items = [];
    }
  },
});

export const pizzaDataSelector = (state) => state.pizzaReducer;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
