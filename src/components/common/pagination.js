import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange, nextPage }) => {
  const pagesCount = Math.ceil((itemsCount / pageSize)/2);
  console.log(`pageCount: ${pagesCount}`, `currentPage: ${currentPage}`)
  //if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <div className="pagination">
      {/* {pages.map(page => (
        // <div
        //   key={page}
        //   className={page === currentPage ? "pagination__item pagination-font active" : "pagination__item pagination-font"}
        // >
          <a href="#"
            onClick={() => onPageChange(page)}
            key={page}
            className={page === currentPage ? "pagination__item active pagination-font" : "pagination__item pagination-font"}
            >{page}</a>  
        // </div>
      ))} */}
      
        {
          (pagesCount > 1 && pagesCount !== currentPage) ?
            <a href="#" className="pagination__item pagination-font"
              onClick={() => nextPage()}
            ><span className="fa fa-ellipsis-h"></span></a>
            : ''
        }
        
    </div>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
