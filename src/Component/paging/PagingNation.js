import React, { useState, useEffect } from "react";
import { Col, Pagination, Row } from "react-bootstrap";

const PagingNation = ({ totalItems = 0, itemsPerPage = 6, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  // Generate pagination items based on screen size
  const getPaginationItems = () => {
    // For mobile screens, show limited page numbers
    if (windowWidth < 576) {
      const items = [];

      // Always show first page
      items.push(1);

      // Show current page if it's not the first
      if (currentPage > 1) {
        items.push(currentPage);
      }

      // Show last page if it's different from first and current
      if (totalPages > 1 && totalPages !== currentPage) {
        items.push(totalPages);
      }

      // Remove duplicates
      return [...new Set(items)];
    }

    // For larger screens, show all pages
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <div className="temp-page-heading">
      <Row className="align-items-center">
        <Col xs={12} md={4} className="mb-3 mb-md-0">
          <h6 className="text-center text-md-start">
            Showing page {currentPage} of {totalPages} | Total Cards: {totalItems}
          </h6>
        </Col>
        <Col xs={12} md={8}>
          <Pagination className="mt-2 justify-content-center justify-content-md-end flex-wrap">
            <Pagination.Prev
              className="temp-page"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />

            {getPaginationItems().map((page) => (
              <Pagination.Item
                key={page}
                className="page-link-data"
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Item>
            ))}

            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default PagingNation;