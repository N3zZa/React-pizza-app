import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterSelector, setCategoryId, setPageCount } from "../redux/slices/filterSlice";

import PizzaBlock from "../components/PizzaBlockFolder/PizzaBlock";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import MyLoader from "../components/PizzaBlockFolder/PizzaBlockLoader";
import Pagination from "../components/Pagination/Pagination";
import { fetchPizzas, pizzaDataSelector } from "../redux/slices/pizzasSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { categoryId, sortType, pageCount, searchValue } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaDataSelector);


  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (num) => {
    dispatch(setPageCount(num));
  };

  useEffect(() => {
    const getPizzas = async () => {
      const sortBy = sortType.sortProperty.replace("-", "");
      const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue ? `search=${searchValue}` : "";

      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          pageCount,
        })
      );
      window.scrollTo(0, 100);

    } 
    getPizzas();
  }, [categoryId, sortType, pageCount, searchValue, dispatch]);

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
          {status === "error" ? (
            <div className="cart__no-pizzas">
              <h2>
                Нет пицц <span>😕</span>
              </h2>
              <p>Случилась непредвиденная ошибка</p>
            </div>
          ) : (
            "Все пиццы"
          )}
        </h2>
        <div className="content__items">
          {status === "loading" ? loaderPizzas : pizzas}
        </div>
        <Pagination pageCount={pageCount} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default Home;
