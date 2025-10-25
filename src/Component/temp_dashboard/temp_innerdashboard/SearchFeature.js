import React from 'react'

const SearchFeature = () => {
  return (
<main className="main-container-box">
          <div className="content-box">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 ">
              {" "}
              <h1 className=" fw500">
                <span class="fw700h1">Temple </span> Dashboard
              </h1>{" "}
              <div>
                <div className="d-flex justify-content-center h-100">
                  <div className="search">
                    <input
                      className="search_input"
                      type="text"
                      value=""
                      placeholder="Search here..."
                    />
                    <button type="submit" className="search_icon">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </main> 
                )
}

export default SearchFeature