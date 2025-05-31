import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import { trackPageView } from "./data/analytics";
import BookSelection from "./components/BookSelection";
import BookContainer from "./components/BookContainer";
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

  React.useEffect(() => {
    // Track page view when the location changes
    trackPageView(`Page: ${location.pathname}`);
  }, [location]);

  return null;
};

// Main App component
function App() {
  return (
    <Router>
      <AppContainer>
        <AnalyticsTracker />
        <Routes>
          {/* Home route - Book Selection */}
          <Route path="/" element={<BookSelection />} />

          {/* Book routes */}
          <Route path="/book/:bookId" element={<BookContainer />} />
          <Route
            path="/book/:bookId/page/:pageNumber"
            element={<BookContainer />}
          />
          <Route path="/book/:bookId/ending" element={<BookContainer />} />

          {/* Legacy routes for backward compatibility */}
          <Route
            path="/page/:pageNumber"
            element={
              <Navigate
                to={(location) => {
                  const pageNum = location.pathname.split("/page/")[1];
                  return `/book/milo/page/${pageNum}`;
                }}
                replace
              />
            }
          />
          <Route
            path="/ending"
            element={<Navigate to="/book/milo/ending" replace />}
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Version />
      </AppContainer>
    </Router>
  );
}

export default App;
