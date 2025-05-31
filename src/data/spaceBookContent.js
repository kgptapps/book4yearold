// Space-themed book content for 4-year-olds
export const spaceBookContent = [
  {
    id: 0,
    title: "Cover",
    content: "Stella's Space Adventure",
    subtitle: "Exploring the Wonders of Space",
    image: "🚀",
    isCover: true,
  },
  {
    id: 1,
    title: "Meet Stella",
    content:
      "Meet Stella, a curious little girl who loves looking at the stars! Tonight, she's going on an adventure to learn about space.",
    image: "👧",
  },
  {
    id: 2,
    title: "The Sun",
    content:
      "Stella's adventure begins with the Sun. The Sun is a very bright star that gives us light and heat during the day.",
    image: "☀️",
    activity: {
      type: "multiple-choice",
      question: "What is the Sun?",
      options: ["A planet", "A star", "The Moon", "A cloud"],
      correctAnswer: "A star",
    },
  },
  {
    id: 3,
    title: "Day and Night",
    content:
      "The Earth spins like a top. When our side faces the Sun, it's daytime. When our side faces away from the Sun, it's nighttime.",
    image: "🌓",
    activity: {
      type: "multiple-choice",
      question: "Why do we have day and night?",
      options: [
        "Because the Sun moves",
        "Because the Earth spins",
        "Because the Moon blocks the Sun",
        "Because the stars come out"
      ],
      correctAnswer: "Because the Earth spins",
    },
  },
  {
    id: 4,
    title: "The Moon",
    content:
      "Stella looks up at the Moon. The Moon is Earth's closest neighbor in space. It circles around our planet.",
    image: "🌕",
    activity: {
      type: "multiple-choice",
      question: "What shape does the Moon make when it circles the Earth?",
      options: ["Square", "Triangle", "Circle", "Zigzag"],
      correctAnswer: "Circle",
    },
  },
  {
    id: 5,
    title: "Stars",
    content:
      "The night sky is filled with stars! Stars are giant balls of hot gas that twinkle in the night. They are very, very far away.",
    image: "✨",
    activity: {
      type: "counting",
      question: "Can you count the stars in this picture?",
      options: ["5", "7", "8", "10"],
      image: "⭐⭐⭐⭐⭐⭐⭐",
      correctAnswer: "7",
    },
  },
  {
    id: 6,
    title: "Planets",
    content:
      "Our Earth is a planet. There are 7 other planets that also circle around the Sun, making a total of 8 planets in our solar system.",
    image: "🪐",
    activity: {
      type: "sequence",
      question: "Can you put these planets in order from closest to the Sun to farthest?",
      options: ["Earth", "Mercury", "Jupiter", "Mars"],
      correctSequence: ["Mercury", "Earth", "Mars", "Jupiter"],
    },
  },
  {
    id: 7,
    title: "Astronauts",
    content:
      "Astronauts are brave people who travel to space in rockets. They wear special suits to help them breathe and stay safe in space.",
    image: "👨‍🚀",
    activity: {
      type: "multiple-choice",
      question: "What do astronauts wear in space?",
      options: ["Pajamas", "Space suits", "Swimsuits", "Regular clothes"],
      correctAnswer: "Space suits",
    },
  },
  {
    id: 8,
    title: "Zero Gravity",
    content:
      "In space, there is something special called 'zero gravity.' It makes astronauts float around instead of walking!",
    image: "🧑‍🚀",
    activity: {
      type: "true-false",
      question: "Do things float in space?",
      options: ["Yes", "No"],
      correctAnswer: "Yes",
    },
  },
  {
    id: 9,
    title: "Space Travel",
    content:
      "Stella dreams of riding in a rocket ship one day. Rockets need to go very, very fast to escape Earth and travel into space.",
    image: "🚀",
    activity: {
      type: "matching",
      question: "Match these space things with what they do:",
      pairs: [
        { item: "Sun", match: "Gives light" },
        { item: "Moon", match: "Circles Earth" },
        { item: "Rocket", match: "Takes people to space" }
      ]
    },
  },
  {
    id: 10,
    title: "Space Facts",
    content:
      "Space is very big and very cold. There is no air in space, and it's very quiet because sound needs air to travel.",
    image: "🌠",
    activity: {
      type: "fill-blank",
      question: "Space is very ___ and very ___.",
      options: ["big", "small", "hot", "cold"],
      correctAnswers: ["big", "cold"],
    },
  },
  {
    id: 11,
    title: "Stella's Dream",
    content:
      "After learning all about space, Stella falls asleep and dreams about floating among the stars and visiting all the planets.",
    image: "💤",
  },
  {
    id: 12,
    title: "The End",
    content:
      "Stella wakes up excited to learn more about space! She knows that one day, she might become an astronaut and explore the universe.",
    image: "📚",
    isEnding: true,
  },
];
