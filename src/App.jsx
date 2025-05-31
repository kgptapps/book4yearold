import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import { bookContent } from "./data/bookContent";
import {
  trackPageView,
  trackBookStarted,
  trackBookCompleted,
  trackBookRestarted,
  trackPageInteraction,
} from "./data/analytics";
import BookCover from "./components/BookCover";
import BookPage from "./components/BookPage";
import EndingPage from "./components/EndingPage";
import Version from "./components/Version";

// App Container styling
const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;

// Analytics tracker component
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when the location changes
    trackPageView(`Page: ${location.pathname}`);
  }, [location]);

  return null;
};

// Main App component
function App() {
  const [page, setPage] = useState(0);
  const totalPages = bookContent.length;

  // Track page changes for analytics
  useEffect(() => {
    if (page > 0 && page < totalPages - 1) {
      trackPageInteraction(page, "view");
    }
  }, [page, totalPages]);

  // Navigation functions with analytics
  const startReading = () => {
    trackBookStarted();
    setPage(1);
  };

  const goToNextPage = () => {
    const nextPage = Math.min(page + 1, totalPages - 1);
    if (nextPage === totalPages - 1) {
      trackBookCompleted();
    }
    setPage(nextPage);
  };

  const goToPreviousPage = () => {
    // If already on page 1, go back to cover (page 0)
    if (page <= 1) {
      setPage(0);
    } else {
      setPage((curr) => curr - 1);
    }
  };

  const readAgain = () => {
    trackBookRestarted();
    setPage(0);
  };

  return (
    <Router>
      <AppContainer>
        <AnalyticsTracker />
        <Routes>
          <Route
            path="/"
            element={
              <BookCover
                onStartReading={startReading}
                pageContent={bookContent[0]}
              />
            }
          />
          <Route
            path="/page/:pageNumber"
            element={
              page === totalPages - 1 ? (
                <Navigate to="/ending" replace />
              ) : (
                <BookPage
                  pageContent={bookContent[page]}
                  pageNumber={page}
                  totalPages={totalPages}
                  onNext={goToNextPage}
                  onPrevious={goToPreviousPage}
                />
              )
            }
          />
          <Route
            path="/ending"
            element={
              <EndingPage
                onReadAgain={readAgain}
                pageContent={bookContent[totalPages - 1]}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Version />
      </AppContainer>
    </Router>
  );
}

export default App;
