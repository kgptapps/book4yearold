export const bookContent = [
  {
    id: 0,
    title: "Cover",
    content: "The Adventures of Milo the Math Mouse",
    subtitle: "An Interactive Learning Journey",
    image: "🐭",
    isCover: true,
  },
  {
    id: 1,
    title: "Meet Milo",
    content:
      "Meet Milo, a small mouse with a big love for solving puzzles! Join Milo as he goes on an adventure through Numbertown.",
    image: "🐭",
  },
  {
    id: 2,
    title: "Counting Cheese",
    content:
      'Milo wakes up and sees 3 cheese pieces on his table. "Oh no!" says Milo. "I need 5 pieces for my friends coming over."',
    image: "🧀🧀🧀",
    activity: {
      type: "multiple-choice",
      question: "How many more pieces of cheese does Milo need?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
    },
  },
  {
    id: 3,
    title: "Finding Shapes",
    content:
      "Milo walks to the kitchen. He sees shapes everywhere! A round clock (circle), a door (rectangle), and a slice of cheese (triangle).",
    image: "⭕ 🔶 📐",
    activity: {
      type: "input",
      question: "Can you name another shape you see around you?",
      correctAnswer: "any",
      isOpenEnded: true,
    },
  },
  {
    id: 4,
    title: "Following Directions",
    content:
      'Milo needs to follow a map to his friend\'s house. "First go straight, then turn right, then go straight again, and turn left."',
    image: "🗺️",
    activity: {
      type: "multiple-choice",
      question: "What would happen if Milo turned left instead of right?",
      options: [
        "He would go the wrong way",
        "He would find a shortcut",
        "He would meet a new friend",
        "He would get lost",
      ],
      correctAnswer: "He would go the wrong way",
    },
  },
  {
    id: 5,
    title: "Color Patterns",
    content:
      "Milo finds a pattern of colored flowers: Red, Blue, Yellow, Red, Blue, _____",
    image: "🌹 🌷 🌻 🌹 🌷 ❓",
    activity: {
      type: "multiple-choice",
      question: "What color comes next in the pattern?",
      options: ["Red", "Blue", "Yellow", "Green"],
      correctAnswer: "Yellow",
    },
  },
  {
    id: 6,
    title: "Letter Fun",
    content:
      "Milo meets his friend Lilly the Letter Lion. Lilly says, \"I'm thinking of something that starts with the letter 'B' and you can bounce it.\"",
    image: "🦁",
    activity: {
      type: "input",
      question: "What could it be?",
      correctAnswer: "ball",
    },
  },
  {
    id: 7,
    title: "Missing Numbers",
    content:
      "Milo and Lilly find a puzzle with missing numbers: 1, ___, 3, 4, ___, 6",
    image: "🔢",
    activity: {
      type: "multiple-choice",
      question: "What are the missing numbers?",
      options: ["2 and 5", "2 and 7", "0 and 5", "3 and 5"],
      correctAnswer: "2 and 5",
    },
  },
  {
    id: 8,
    title: "Sorting by Size",
    content:
      "They need to sort these items by size: A tiny ant, A medium apple, A big balloon",
    image: "🐜 🍎 🎈",
    activity: {
      type: "multiple-choice",
      question: "What is the correct order from smallest to biggest?",
      options: [
        "Ant, Apple, Balloon",
        "Balloon, Apple, Ant",
        "Apple, Ant, Balloon",
        "Ant, Balloon, Apple",
      ],
      correctAnswer: "Ant, Apple, Balloon",
    },
  },
  {
    id: 9,
    title: "Counting Animals",
    content:
      "Milo needs to count how many animals he sees: 2 birds, 1 cat, 3 squirrels",
    image: "🐦🐦 🐱 🐿️🐿️🐿️",
    activity: {
      type: "multiple-choice",
      question: "How many animals altogether?",
      options: ["4", "5", "6", "7"],
      correctAnswer: "6",
    },
  },
  {
    id: 10,
    title: "Sharing Cookies",
    content:
      "Milo and his friends want to share 8 cookies equally. There are 4 friends including Milo.",
    image: "🍪🍪🍪🍪🍪🍪🍪🍪",
    activity: {
      type: "multiple-choice",
      question: "How many cookies will each friend get?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
    },
  },
  {
    id: 11,
    title: "Word Game",
    content:
      "It starts to rain! Milo sees these letters floating down: R, A, I, N, B, O, W",
    image: "☔️",
    activity: {
      type: "input",
      question: "What word can you make with these letters?",
      correctAnswer: "rainbow",
    },
  },
  {
    id: 12,
    title: "The End",
    content:
      "After their adventure, Milo learned that math and letters are everywhere! He loves solving puzzles with his friends.",
    image: "🐭👋",
    isEnd: true,
    activity: {
      type: "input",
      question: "What was your favorite part of Milo's adventure?",
      correctAnswer: "any",
      isOpenEnded: true,
    },
  },
];
