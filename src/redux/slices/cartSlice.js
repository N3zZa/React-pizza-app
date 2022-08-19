import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, {payload}) {
      try {
        const findItem = state.items.find(obj => {
          return ((obj.id === payload.id) &&
            (obj.size === payload.size) &&
            (obj.type === payload.type))
        });
        findItem ? findItem.count++ : state.items.push({
          ...payload, count: 1
        });
        state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price * obj.count + sum;
        }, 0);
      } catch (error) {
        alert('Не удалось добавить пиццу в корзину :(')
        console.error(error)
      }
    },
    removePizzaCart(state, {payload}) {
        const findItem = state.items.find(obj => {
          return ((obj.id === payload.id) &&
          (obj.size === payload.size) &&
          (obj.type === payload.type))
        });
          findItem && findItem.count--;
          state.totalPrice -= findItem.price;
  },
    removePizza(state, action) {
        try {
          const findItem = state.items.find(obj => {
            return ((obj.id === action.payload.id) &&
              (obj.size === action.payload.size) &&
              (obj.type === action.payload.type))
          });
          console.log(findItem)
        state.totalPrice -= findItem.price * findItem.count;

        state.items = state.items.filter(
          (obj) =>
            obj.id !== action.payload.id ||
            obj.size !== action.payload.size ||
            obj.type !== action.payload.type
        );
       
        } catch (error) {
          alert('Не удалось удалить пиццу :(')
          console.error(error)
        }
    },
    clearPizzas(state) {
        try {
        state.items = [];
        state.totalPrice = 0;
        } catch (error) {
          alert('Не удалось очистить пиццы :(')
          console.error(error)
        }
    },
  },
});

export const {addPizza,removePizza,clearPizzas, addPizzaCart, removePizzaCart} = cartSlice.actions;

export default cartSlice.reducer;