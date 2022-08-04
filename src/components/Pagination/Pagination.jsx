import React from 'react';

import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss"

const Pagination = ({ pageCount, onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        forcePage={pageCount - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
