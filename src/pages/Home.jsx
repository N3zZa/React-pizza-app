import React,{ useState, useEffect } from 'react';

import PizzaBlock from "../components/PizzaBlockFolder/PizzaBlock"
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import MyLoader from "../components/PizzaBlockFolder/PizzaBlockLoader";


const Home = ({ pizzaCount, addPizza, searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);

  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const isCategory = categoryId > 0 ? `category=${categoryId}` : "";
  const sortBy = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(
        `https://62d53c2115ad24cbf2c243ef.mockapi.io/items?${isCategory}&sortBy=${sortBy}&order=${order}${search}`,
      )
        .then((res) => res.json())
        .then((json) => {
          setItems(json);
          setIsLoading(false);
        });
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Что-то пошло не так :(");
      console.error(error);
    }
  }, [categoryId, sortType, searchValue, isCategory, sortBy, order, search]);

  const pizzas = items
    .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => (
      <PizzaBlock
        {...item}
        pizzaCount={pizzaCount}
        addPizza={addPizza}
        key={item.id}
      />
    ));
  const loaderPizzas = [...new Array(6)].map((_, index) => <MyLoader key={index} />)

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            setCategoryId={(i) => setCategoryId(i)}
          />
          <Sort sortType={sortType} setSortType={(i) => setSortType(i)} />
        </div>
        <h2 className="content__title">{pizzas.length === 0 ? "Нет пицц :(" : "Все пиццы"}</h2>
        <div className="content__items">
          {isLoading
            ? loaderPizzas
            : pizzas} 
        </div>
      </div>
    </div>
  );
};

export default Home;
