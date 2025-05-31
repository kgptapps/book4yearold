import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { trackEvent } from "../data/analytics";

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #f8f4e3;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  min-height: 80vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #e63946;
  text-align: center;
  margin-bottom: 30px;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 800px;
`;

const BookCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const BookImage = styled.div`
  font-size: 5rem;
  margin-bottom: 15px;
`;

const BookTitle = styled.h3`
  font-size: 1.5rem;
  color: #457b9d;
  margin-bottom: 10px;
  text-align: center;
`;

const BookDescription = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #555;
  margin-bottom: 20px;
`;

const SelectButton = styled.button`
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c1121f;
  }
`;

const BackToLibraryButton = styled.button`
  background-color: #a8dadc;
  color: #1d3557;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 0.9rem;
  margin-top: 30px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #76c5d6;
  }
`;

function BookSelection() {
  const navigate = useNavigate();

  const books = [
    {
      id: "milo",
      title: "The Adventures of Milo the Math Mouse",
      description: "Join Milo on an adventure filled with math, puzzles, and fun!",
      emoji: "🐭",
      path: "/book/milo"
    },
    {
      id: "stella",
      title: "Stella's Space Adventure",
      description: "Explore the wonders of space with Stella and learn about planets, stars, and astronauts!",
      emoji: "🚀",
      path: "/book/stella"
    }
  ];

  const handleBookSelect = (bookId) => {
    trackEvent("book_selected", { book_id: bookId });
    navigate(`/book/${bookId}`);
  };

  return (
    <SelectionContainer>
      <Title>Choose a Book</Title>
      <BooksGrid>
        {books.map((book) => (
          <BookCard key={book.id} onClick={() => handleBookSelect(book.id)}>
            <BookImage>{book.emoji}</BookImage>
            <BookTitle>{book.title}</BookTitle>
            <BookDescription>{book.description}</BookDescription>
            <SelectButton>Read this book</SelectButton>
          </BookCard>
        ))}
      </BooksGrid>
    </SelectionContainer>
  );
}

export default BookSelection;
