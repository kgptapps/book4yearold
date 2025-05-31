import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { trackPageView, trackEvent } from "../data/analytics";

const CoverContainer = styled.div`
  text-align: center;
  padding: 40px;
  background-color: #f8f4e3;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #e63946;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: #457b9d;
  margin-bottom: 30px;
`;

const CoverImage = styled.div`
  width: 300px;
  height: 300px;
  margin: 20px auto;
  background-color: #a8dadc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  color: #1d3557;
`;

const StartButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #d90429;
    transform: scale(1.05);
  }
`;

const LibraryButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
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

function BookCover({ pageContent, onStartReading, onReturnToLibrary, bookId }) {
  const navigate = useNavigate();

  // Track cover page view
  useEffect(() => {
    trackPageView(`Book Cover: ${bookId}`);
  }, [bookId]);

  console.log("BookCover rendered with pageContent:", pageContent);

  const handleStartReading = () => {
    console.log("Start Reading button clicked");
    trackEvent("start_reading_clicked", { book_id: bookId });
    onStartReading();
    navigate(`/book/${bookId}/page/1`);
  };

  // Get book description based on bookId
  const getBookDescription = () => {
    if (bookId === "stella") {
      return "Explore the wonders of space with Stella and learn about planets, stars, and astronauts!";
    }
    return "Join Milo on an adventure filled with math, puzzles, and fun!";
  };

  return (
    <CoverContainer>
      <LibraryButton onClick={onReturnToLibrary}>Back to Library</LibraryButton>
      <div>
        <Title>{pageContent.content}</Title>
        <Subtitle>{pageContent.subtitle}</Subtitle>
      </div>

      <CoverImage>{pageContent.image}</CoverImage>

      <div>
        <p>{getBookDescription()}</p>
        <StartButton onClick={handleStartReading}>Start Reading</StartButton>
      </div>
    </CoverContainer>
  );
}

export default BookCover;
