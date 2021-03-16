import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize } = props;

  const pagesCount = itemsCount / pageSize;

  const pages = _.range(1, pagesCount + 1);

  

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className={page === props.currentPage? 'page-item active': 'page-item'}>
            <button className="page-link" onClick={() => props.onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
