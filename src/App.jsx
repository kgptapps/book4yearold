import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import { bookContent } from "./data/bookContent";
import BookCover from "./components/BookCover";
import BookPage from "./components/BookPage";
import EndingPage from "./components/EndingPage";

// App Container styling
const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;

// Main App component
function App() {
  const [page, setPage] = useState(0);
  const totalPages = bookContent.length;

  // Navigation functions
  const startReading = () => setPage(1);
  const goToNextPage = () =>
    setPage((curr) => Math.min(curr + 1, totalPages - 1));
  const goToPreviousPage = () => setPage((curr) => Math.max(curr - 1, 0));
  const readAgain = () => setPage(0);

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route
            path="/"
            element={
              page === 0 ? (
                <BookCover
                  onStartReading={startReading}
                  pageContent={bookContent[page]}
                />
              ) : page === totalPages - 1 ? (
                <EndingPage
                  onReadAgain={readAgain}
                  pageContent={bookContent[page]}
                />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
