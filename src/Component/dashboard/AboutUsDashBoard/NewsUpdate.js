import React from "react";
import { Col } from "react-bootstrap";
import { BsNewspaper } from "react-icons/bs";

const NewsUpdates = () => {
  return (
    <>
  <Col lg={12} md={12} sm={12} className="">
                    <div class="sd-upcoming-events mt-3">
                      <div class="sd-side-heading fw500 sd-border-no">
                        <span class="fw700">Upcoming</span> Events
                      </div>
                      <div class="slick-list">No Events</div>
                    </div>
                  </Col>

    <Col lg={12} md={12} sm={12}>
      <div className="sd-news-updates">
        <h2 className="sd-side-heading fw500">
          <span className="fw700">News</span> Updates
        </h2>

        <div className="sd-news-list mt-20">
          <div className="item">
            <div className="sd-news-para">
              <div className="news-icon-text">
                <BsNewspaper className="up-come-icon" />
                <p>
                  Dussera Celebrations will be started with great grandeur from
                  25-09-2022
                </p>
              </div>
              <span className="sd-news-date">09 Sep 2022</span>
            </div>
          </div>
        </div>

        <div className="clearfix user-btn-all mt-4">
          <button className="sd-btn-orange">View All</button>
        </div>
      </div>
    </Col>
    </>
  );
};

export default NewsUpdates;
