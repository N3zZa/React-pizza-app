import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setPageCount } from "../redux/slices/filterSlice";
import axios from "axios";

import PizzaBlock from "../components/PizzaBlockFolder/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import MyLoader from "../components/PizzaBlockFolder/PizzaBlockLoader";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();

  const { categoryId, sortType, pageCount } = useSelector(
    (state) => state.filterReducer
  );
  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setPageCount(num));
  };

  useEffect(() => {
    try {
      
      setIsLoading(true);
      
      const sortBy = sortType.sortProperty.replace("-", "");
      const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue ? `search=${searchValue}` : "";
      
      axios
      .get(
        `https://62d53c2115ad24cbf2c243ef.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
        window.scrollTo(0, 100);
    } catch (error) {
      alert("Что-то пошло не так :(");
      console.error(error);
    }
  }, [categoryId, sortType, pageCount,searchValue]);

  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => <PizzaBlock {...item} key={item.id} />);
  const loaderPizzas = [...new Array(6)].map((_, index) => (
    <MyLoader key={index} />
  ));

  return (
    <div className="content">
      <div className="container container_pizzas">
        <div className="content__top">
          <Categories categoryId={categoryId} setCategoryId={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title">
          {pizzas.length !== 0 || isLoading ? "Все пиццы" : "Нет пицц :("}
        </h2>
        <div className="content__items">
          {isLoading ? loaderPizzas : pizzas}
        </div>
        <Pagination pageCount={pageCount} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default Home;
