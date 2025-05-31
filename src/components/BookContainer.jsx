import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookContent } from "../data/bookContent";
import { spaceBookContent } from "../data/spaceBookContent";
import BookCover from "./BookCover";
import BookPage from "./BookPage";
import EndingPage from "./EndingPage";
import { trackBookStarted, trackBookCompleted, trackBookRestarted, trackEvent } from "../data/analytics";

function BookContainer() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  
  // Select the appropriate book content based on the bookId
  const content = bookId === "stella" ? spaceBookContent : bookContent;
  const totalPages = content.length;
  
  // Reset page to 0 when book changes
  useEffect(() => {
    setPage(0);
    trackEvent("book_loaded", { book_id: bookId });
  }, [bookId]);
  
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
  
  const returnToLibrary = () => {
    trackEvent("return_to_library", { from_book: bookId, from_page: page });
    navigate("/");
  };

  if (page === 0) {
    return (
      <BookCover
        onStartReading={startReading}
        pageContent={content[page]}
        onReturnToLibrary={returnToLibrary}
        bookId={bookId}
      />
    );
  } else if (page === totalPages - 1) {
    return (
      <EndingPage
        onReadAgain={readAgain}
        pageContent={content[page]}
        onReturnToLibrary={returnToLibrary}
        bookId={bookId}
      />
    );
  } else {
    return (
      <BookPage
        pageContent={content[page]}
        pageNumber={page}
        totalPages={totalPages}
        onNext={goToNextPage}
        onPrevious={goToPreviousPage}
        onReturnToLibrary={returnToLibrary}
        bookId={bookId}
      />
    );
  }
}

export default BookContainer;
