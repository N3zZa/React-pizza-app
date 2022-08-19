import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  pageCount: 1,
  sortType: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state,action) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.pageCount);
        state.categoryId = Number(action.payload.categoryId);
        state.sortType = action.payload.sortType;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sortType = {
          name: "популярности",
          sortProperty: "rating",
        }
      }
    }
  },
});

export const { setCategoryId, setSortType, setPageCount,setFilters } = filterSlice.actions;

export default filterSlice.reducer;