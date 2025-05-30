import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { trackPageView, trackEvent } from "../data/analytics";

const EndingContainer = styled.div`
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

const EndingTitle = styled.h1`
  font-size: 2.5rem;
  color: #e63946;
  margin-bottom: 10px;
`;

const EndingImage = styled.div`
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

const Button = styled.button`
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

function EndingPage({ pageContent, onReadAgain }) {
  const navigate = useNavigate();

  // Track ending page view
  useEffect(() => {
    trackPageView("Ending Page");
    trackEvent("book_completed");
  }, []);

  const handleReadAgain = () => {
    trackEvent("read_again_clicked");
    onReadAgain();
    navigate("/");
  };

  return (
    <EndingContainer>
      <div>
        <EndingTitle>The End</EndingTitle>
        <p>{pageContent.content}</p>
      </div>

      <EndingImage>{pageContent.image}</EndingImage>

      <div>
        <p>Thank you for reading Milo's adventure!</p>
        <Button onClick={handleReadAgain}>Read Again</Button>
      </div>
    </EndingContainer>
  );
}

export default EndingPage;
