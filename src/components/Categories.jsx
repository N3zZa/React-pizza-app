import React from 'react';

const Categories = ({ categoryId, setCategoryId }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианские",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((name, i) => (
          <li
            key={i}
            onClick={() => setCategoryId(i)}
            className={categoryId === i ? "active" : " "}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
