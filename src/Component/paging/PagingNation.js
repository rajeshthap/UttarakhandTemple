import React, { useState } from "react";
import { Col, Pagination, Row } from "react-bootstrap";

const PagingNation = ({ totalItems = 0, itemsPerPage = 6, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <>
      {/*Info Section */}
      

      {/* Pagination */}
      <Row>
        <Col lg={12} className="temp-page-heading">
         <div className=" mb-3">
        <h6>
          Showing page {currentPage} of {totalPages} | Total Cards: {totalItems}
        </h6>
      </div>
      <div><Pagination className="mt-2  ">
       
        <Pagination.Prev className="temp-page"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item className="page-link-data"
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next 
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </Pagination></div>
        </Col>
       
      </Row>
      
    </>
  );
};

export default PagingNation;
