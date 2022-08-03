import React,{ useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {setCategoryId} from "../redux/slices/filterSlice";


import PizzaBlock from "../components/PizzaBlockFolder/PizzaBlock"
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import MyLoader from "../components/PizzaBlockFolder/PizzaBlockLoader";
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterReducer.categoryId);
  const sortType = useSelector((state) => state.filterReducer.sortType.sortProperty);

  const { searchValue } = useContext(SearchContext);
  
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

/*   const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
 */
  const isCategory = categoryId > 0 ? `category=${categoryId}` : "";
  const sortBy = sortType.replace("-", "");
  const order = sortType.includes("-") ? "asc" : "desc";
  const search = searchValue ? `&search=${searchValue}` : "";


  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };


  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(
        `https://62d53c2115ad24cbf2c243ef.mockapi.io/items?page=${currentPage}&limit=4&${isCategory}&sortBy=${sortBy}&order=${order}${search}`
      )
        .then((res) => res.json())
        .then((json) => {
          setItems(json);
          setIsLoading(false);
        });
      window.scrollTo(0, 100);
    } catch (error) {
      alert("Что-то пошло не так :(");
      console.error(error);
    }
  }, [
    categoryId,
    sortType,
    searchValue,
    isCategory,
    sortBy,
    order,
    search,
    currentPage,
  ]);

  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => (
      <PizzaBlock
        {...item}
        key={item.id}
      />
    ));
  const loaderPizzas = [...new Array(6)].map((_, index) => (
    <MyLoader key={index} />
  ));

  return (
    <div className="content">
      <div className="container">
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
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
    </div>
  );
};

export default Home;
