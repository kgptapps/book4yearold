import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  trackActivityCompletion,
  trackPageInteraction,
  trackEvent,
} from "../data/analytics";

const PageContainer = styled.div`
  background-color: #f8f4e3;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const PageHeader = styled.h2`
  color: #1d3557;
  margin-bottom: 20px;
`;

const PageContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const ImageContainer = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 5rem;
  background-color: #a8dadc;
  border-radius: 10px;
  padding: 20px;
`;

const ActivitySection = styled.div`
  background-color: #a8dadc;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
`;

const InteractiveElement = styled.div`
  margin: 20px 0;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  position: relative;
`;

const LibraryButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  padding: 8px 15px;
  font-size: 0.9rem;
  background-color: #a8dadc;
  color: #1d3557;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #76c5d6;
  }
`;

const NavButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #457b9d;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #1d3557;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.div`
  text-align: center;
  color: #666;
  margin-top: 10px;
`;

const AnswerButton = styled.button`
  background-color: ${(props) => (props.$isSelected ? "#e63946" : "#f1faee")};
  color: ${(props) => (props.$isSelected ? "white" : "black")};
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px 15px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.3s;
`;

const InputAnswer = styled.input`
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
  max-width: 300px;
`;

const CheckButton = styled.button`
  padding: 8px 15px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #d90429;
  }
`;

const FeedbackMessage = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.$isCorrect ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.$isCorrect ? "#155724" : "#721c24")};
`;

function BookPage({
  pageContent,
  pageNumber,
  totalPages,
  onNext,
  onPrevious,
  onReturnToLibrary,
  bookId,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  const params = useParams();

  // Sync page number from URL parameters if needed
  useEffect(() => {
    const urlPageNumber = params.pageNumber
      ? parseInt(params.pageNumber)
      : null;
    if (
      urlPageNumber &&
      urlPageNumber !== pageNumber &&
      urlPageNumber > 0 &&
      urlPageNumber < totalPages - 1
    ) {
      console.log(
        `URL page number (${urlPageNumber}) differs from state (${pageNumber}), syncing...`
      );
      // Don't call handlers directly to avoid navigation loops
      trackEvent("page_synced_from_url", {
        from_page: pageNumber,
        to_page: urlPageNumber,
        book_id: bookId,
      });
    }
  }, [params.pageNumber, pageNumber, totalPages, bookId]);

  // Track page interactions when component mounts
  useEffect(() => {
    trackPageInteraction(pageNumber, "view", { book_id: bookId });
  }, [pageNumber, bookId]);

  console.log("BookPage rendered with:", {
    pageContent,
    pageNumber,
    totalPages,
  });

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowAnswer(false);
  };

  const checkAnswer = () => {
    setShowAnswer(true);

    // Track the activity completion for analytics
    if (pageContent.question && pageContent.correctAnswer) {
      const isCorrect = selectedAnswer === pageContent.correctAnswer;
      trackActivityCompletion(
        `Page ${pageNumber}: ${pageContent.question}`,
        isCorrect
      );
    }
  };

  const handlePrevious = () => {
    if (pageNumber <= 1) {
      // For page 1, navigate to cover (page 0)
      trackEvent("button_click", {
        button: "back_to_cover",
        from_page: pageNumber,
        book_id: bookId,
      });
      // First update state, then navigate
      onPrevious(); // This will set the page state to 0
      setTimeout(() => {
        navigate(`/book/${bookId}`);
      }, 0);
    } else {
      trackEvent("button_click", {
        button: "previous_page",
        from_page: pageNumber,
        to_page: pageNumber - 1,
        book_id: bookId,
      });
      // First update state, then navigate
      onPrevious();
      setTimeout(() => {
        navigate(`/book/${bookId}/page/${pageNumber - 1}`);
      }, 0);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages - 1) {
      trackEvent("button_click", {
        button: "next_page",
        from_page: pageNumber,
        to_page: pageNumber + 1,
        book_id: bookId,
      });
      onNext();
      setTimeout(() => {
        navigate(`/book/${bookId}/page/${pageNumber + 1}`);
      }, 0);
    } else if (pageNumber === totalPages - 1) {
      trackEvent("book_ending", {
        book_id: bookId,
      });
      setTimeout(() => {
        navigate(`/book/${bookId}/ending`);
      }, 0);
    }
  };

  const handleReturnToLibrary = () => {
    trackEvent("return_to_library", {
      from_book: bookId,
      from_page: pageNumber,
    });
    onReturnToLibrary();
  };

  const isAnswerCorrect = () => {
    if (!pageContent.activity) return false;
    if (pageContent.activity.isOpenEnded) return true;

    if (pageContent.activity.type === "input") {
      if (pageContent.activity.correctAnswer === "any") return true;
      return (
        selectedAnswer.toLowerCase() ===
        pageContent.activity.correctAnswer.toLowerCase()
      );
    } else {
      return selectedAnswer === pageContent.activity.correctAnswer;
    }
  };

  return (
    <PageContainer>
      <PageHeader>{pageContent.title}</PageHeader>

      <PageContent>
        <div>{pageContent.content}</div>

        {pageContent.image && (
          <ImageContainer>{pageContent.image}</ImageContainer>
        )}

        {pageContent.activity && (
          <ActivitySection>
            <h3>{pageContent.activity.question}</h3>

            {pageContent.activity.type === "multiple-choice" && (
              <InteractiveElement>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {pageContent.activity.options.map((option, index) => (
                    <AnswerButton
                      key={index}
                      $isSelected={selectedAnswer === option}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </AnswerButton>
                  ))}
                </div>

                <div style={{ marginTop: "15px" }}>
                  <CheckButton onClick={checkAnswer}>Check Answer</CheckButton>

                  {showAnswer && (
                    <FeedbackMessage $isCorrect={isAnswerCorrect()}>
                      {isAnswerCorrect() ? (
                        <span>That's correct! Great job! 🎉</span>
                      ) : (
                        <span>
                          Try again! The correct answer is{" "}
                          {pageContent.activity.correctAnswer}
                        </span>
                      )}
                    </FeedbackMessage>
                  )}
                </div>
              </InteractiveElement>
            )}

            {pageContent.activity.type === "input" && (
              <InteractiveElement>
                <InputAnswer
                  type="text"
                  placeholder="Type your answer here"
                  value={selectedAnswer}
                  onChange={(e) => handleAnswer(e.target.value)}
                />

                <div>
                  <CheckButton onClick={checkAnswer}>Check Answer</CheckButton>

                  {showAnswer && (
                    <FeedbackMessage $isCorrect={isAnswerCorrect()}>
                      {isAnswerCorrect() || pageContent.activity.isOpenEnded ? (
                        <span>That's a great answer! 🎉</span>
                      ) : (
                        <span>
                          Try again! The correct answer is{" "}
                          {pageContent.activity.correctAnswer}
                        </span>
                      )}
                    </FeedbackMessage>
                  )}
                </div>
              </InteractiveElement>
            )}
          </ActivitySection>
        )}
      </PageContent>

      <NavigationButtons>
        <LibraryButton onClick={handleReturnToLibrary}>
          Back to Library
        </LibraryButton>
        <NavButton onClick={handlePrevious}>
          {pageNumber === 1 ? "Back to Cover" : "Previous Page"}
        </NavButton>

        <NavButton onClick={handleNext}>
          {pageNumber === totalPages - 1 ? "Finish Story" : "Next Page"}
        </NavButton>
      </NavigationButtons>

      <PageNumber>
        Page {pageNumber} of {totalPages - 1}
      </PageNumber>
    </PageContainer>
  );
}

export default BookPage;
