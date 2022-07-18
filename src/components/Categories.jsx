import React,{useState} from 'react';

const Categories = () => {
  const [activeNumber, setActiveNumber] = useState(0);

  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];


    return (
      <div className="categories">
        <ul>
          {categories.map((name, i) => (
            <li
              key={i}
              onClick={() => setActiveNumber(i)}
              className={activeNumber === i ? "active" : " "}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Categories;
