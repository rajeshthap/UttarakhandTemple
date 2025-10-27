import React, { useEffect, useState } from "react";
import { Col, Spinner } from "react-bootstrap";
import { BsNewspaper } from "react-icons/bs";
import axios from "axios";

const NewsUpdates = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 4; 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://mahadevaaya.com/backend/api/reg-festival/");
        if (Array.isArray(res.data)) {
          const sorted = [...res.data].sort(
            (a, b) => new Date(b.start_date_time) - new Date(a.start_date_time)
          );
          setEvents(sorted);
        } else {
          setEvents([res.data]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalPages = Math.ceil(events.length / perPage);
  const startIndex = currentPage * perPage;
  const currentEvents = events.slice(startIndex, startIndex + perPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {/* --- Upcoming Events Section --- */}
      <Col lg={12} md={12} sm={12}>
        <div className="sd-news-updates">
          <h2 className="sd-side-heading fw500">
            <span className="fw700">Upcoming</span> Events
          </h2>

          {loading ? (
            <div className="text-center mt-3">
              <Spinner animation="border" variant="warning" />
            </div>
          ) : events.length === 0 ? (
            <div className="slick-list">No Events</div>
          ) : (
            <div className="sd-news-list mt-20">
              {currentEvents.map((event, index) => (
                <div className="item" key={index}>
                  <div className="sd-news-para">
                    <div className="news-icon-text">
                      <BsNewspaper className="up-come-icon" />
                      <p>
                        <strong>{event.temple_name}</strong> —{" "}
                        {event.festival_name}: {event.description}
                      </p>
                    </div>
                    <span className="sd-news-date">
                      {formatDate(event.start_date_time)} ({event.start_day}) -{" "}
                      {formatDate(event.end_date_time)} ({event.end_day})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- Pagination Buttons --- */}
          {!loading && events.length > 0 && (
            <div className="clearfix user-btn-all mt-4 d-flex justify-content-center gap-3">
              {currentPage > 0 && (
                <button className="sd-btn-orange" onClick={handlePrevious}>
                  Previous
                </button>
              )}
              {currentPage < totalPages - 1 && (
                <button className="sd-btn-orange" onClick={handleNext}>
                  Next
                </button>
              )}
            </div>
          )}
        </div>
      </Col>

      {/* --- News Updates Section (Dussera Style) --- */}
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
                    Dussera Celebrations will be started with great grandeur
                    from 25-09-2022
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
