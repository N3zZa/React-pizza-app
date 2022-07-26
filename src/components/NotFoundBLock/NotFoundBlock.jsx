import React from 'react';
import styles from "./NotFoundBlock.module.scss";
import {Link} from "react-router-dom";

const NotFoundBlock = () => {
    return (
      <div className={styles.root}>
        <h1>Not found(ничего не найдено)</h1>
        <Link to="">
          <button className={styles.button}>
            <svg
              className={styles.arrow}
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7H14.7143"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.71436 1L14.7144 7L8.71436 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Вернуться назад
          </button>
        </Link>
      </div>
    );
}

export default NotFoundBlock;
