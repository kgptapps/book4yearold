import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import BookCover from "./BookCover";
import BookPage from "./BookPage";
import EndingPage from "./EndingPage";
import { bookContent } from "../data/bookContent";

function AppContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = bookContent.length;
  const location = useLocation();
  const navigate = useNavigate();

  // Sync URL with state
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      setCurrentPage(0);
    } else if (path === "/ending") {
      setCurrentPage(totalPages - 1);
    } else {
      const match = path.match(/\/page\/(\d+)/);
      if (match) {
        const pageNum = parseInt(match[1], 10);
        if (pageNum >= 1 && pageNum < totalPages - 1) {
          setCurrentPage(pageNum);
        }
      }
    }
  }, [location.pathname, totalPages]);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <BookCover
            pageContent={bookContent[0]}
            onStartReading={() => setCurrentPage(1)}
          />
        }
      />
      {bookContent.slice(1, -1).map((page, index) => (
        <Route
          key={index + 1}
          path={`/page/${index + 1}`}
          element={
            <BookPage
              pageContent={page}
              pageNumber={index + 1}
              totalPages={totalPages - 1} // Excluding cover and ending
              onNextPage={goToNextPage}
              onPreviousPage={goToPreviousPage}
            />
          }
        />
      ))}
      <Route
        path="/ending"
        element={
          <EndingPage pageContent={bookContent[bookContent.length - 1]} />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppContent;
