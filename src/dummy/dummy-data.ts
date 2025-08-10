// Defines the structure of a single comment
export interface CommentType {
  name: string;
  text: string;
  date: string;
}

const generateId = (): string => Math.random().toString(36).substring(2, 8);
const generateContent = (topic: string) =>
  `This article on ${topic} provides valuable insights and practical tips. It explains concepts clearly, making learning enjoyable and efficient.`;

export interface ArticleType {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  status: "draft" | "published";
  views: number;
  content: string; // ✅ New field

  likes: number;

  comments: CommentType[];
}

// Your initial article data
export const initialArticles: ArticleType[] = [
  {
    id: generateId(),

    title: "Understanding Async/Await in JavaScript",
    author: "Jane Doe",
    publishedDate: "2024-08-10",
    views: 1523,
    likes: 245,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Alice",
        text: "Great explanation! Helped me a lot.",
        date: "2024-08-11",
      },
      {
        name: "Bob",
        text: "Can you make a video on this topic?",
        date: "2024-08-12",
      },
    ],
  },
  {
    id: generateId(),

    title: "A Guide to React Hooks",
    author: "John Smith",
    publishedDate: "2024-07-22",
    views: 2345,
    likes: 389,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      { name: "Emily", text: "Very helpful, thanks!", date: "2024-07-23" },
    ],
  },
  {
    id: generateId(),

    title: "CSS Grid vs Flexbox: When to Use Which",
    author: "Michael Brown",
    publishedDate: "2024-06-15",
    views: 1980,
    likes: 310,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Sophia",
        text: "Clear comparison, learned a lot.",
        date: "2024-06-16",
      },
      { name: "Liam", text: "Flexbox still my favorite!", date: "2024-06-17" },
    ],
  },
  {
    id: generateId(),

    title: "Node.js Performance Tips",
    author: "Laura Wilson",
    publishedDate: "2024-05-10",
    views: 1760,
    likes: 220,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "James",
        text: "Good tips for optimizing server-side code.",
        date: "2024-05-11",
      },
    ],
  },
  {
    id: generateId(),

    title: "TypeScript for Beginners",
    author: "David Lee",
    publishedDate: "2024-04-01",
    views: 1450,
    likes: 275,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Olivia",
        text: "Just started using TS, this helped!",
        date: "2024-04-02",
      },
    ],
  },
  {
    id: generateId(),

    title: "Building REST APIs with Express",
    author: "Emma Johnson",
    publishedDate: "2024-03-28",
    views: 1890,
    likes: 300,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      { name: "Noah", text: "Simple and clear API guide.", date: "2024-03-29" },
      { name: "Ava", text: "Can you add OAuth examples?", date: "2024-03-30" },
    ],
  },
  {
    id: generateId(),

    title: "Introduction to GraphQL",
    author: "Daniel Martinez",
    publishedDate: "2024-02-20",
    views: 1600,
    likes: 280,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Isabella",
        text: "GraphQL looks promising!",
        date: "2024-02-21",
      },
    ],
  },
  {
    id: generateId(),

    title: "State Management with Redux Toolkit",
    author: "Sophia Taylor",
    publishedDate: "2024-01-15",
    views: 2100,
    likes: 350,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Mason",
        text: "Redux Toolkit simplified things a lot.",
        date: "2024-01-16",
      },
    ],
  },
  {
    id: generateId(),

    title: "Getting Started with Next.js",
    author: "Ethan Harris",
    publishedDate: "2023-12-10",
    views: 1950,
    likes: 330,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      { name: "Mia", text: "Next.js is awesome for SSR!", date: "2023-12-11" },
    ],
  },
  {
    id: generateId(),

    title: "Docker Basics for Developers",
    author: "Charlotte Clark",
    publishedDate: "2023-11-05",
    views: 1750,
    likes: 260,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Logan",
        text: "Containerization made easy.",
        date: "2023-11-06",
      },
    ],
  },
  {
    id: generateId(),

    title: "Debugging JavaScript Like a Pro",
    author: "Benjamin Lewis",
    publishedDate: "2023-10-01",
    views: 1850,
    likes: 270,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Amelia",
        text: "Great tips for troubleshooting.",
        date: "2023-10-02",
      },
    ],
  },
  {
    id: generateId(),

    title: "Introduction to Web Accessibility",
    author: "Ella Walker",
    publishedDate: "2023-09-15",
    views: 1650,
    likes: 240,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Jacob",
        text: "Important topic, well explained.",
        date: "2023-09-16",
      },
    ],
  },
  {
    id: generateId(),

    title: "Building Mobile Apps with React Native",
    author: "Oliver Young",
    publishedDate: "2023-08-10",
    views: 2200,
    likes: 370,
    status: "draft",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      { name: "Harper", text: "React Native is powerful!", date: "2023-08-11" },
    ],
  },
  {
    id: generateId(),

    title: "Serverless Functions with AWS Lambda",
    author: "Mia King",
    publishedDate: "2023-07-05",
    views: 1500,
    likes: 230,
    status:  "published",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      { name: "Elijah", text: "Serverless is the future.", date: "2023-07-06" },
    ],
  },
  {
    id: generateId(),

    title: "Mastering CSS Animations",
    author: "Lucas Wright",
    publishedDate: "2023-06-01",
    views: 1700,
    likes: 250,
    status:  "published",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Evelyn",
        text: "Animations really make sites stand out.",
        date: "2023-06-02",
      },
    ],
  },
  {
    id: generateId(),

    title: "Understanding Promises in JavaScript",
    author: "Amelia Scott",
    publishedDate: "2023-05-10",
    views: 1800,
    likes: 265,
    status:  "published",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      { name: "Henry", text: "Promises demystified!", date: "2023-05-11" },
    ],
  },
  {
    id: generateId(),

    title: "Building Scalable APIs with Fastify",
    author: "Ethan Green",
    publishedDate: "2023-04-20",
    views: 1400,
    likes: 215,
    status:  "published",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Abigail",
        text: "Fastify is fast and efficient.",
        date: "2023-04-21",
      },
    ],
  },
  {
    id: generateId(),

    title: "GraphQL vs REST: Pros and Cons",
    author: "Isabella Baker",
    publishedDate: "2023-03-15",
    views: 1550,
    likes: 225,
    status:  "published",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Jackson",
        text: "Good comparison for beginners.",
        date: "2023-03-16",
      },
    ],
  },
  {
    id: generateId(),

    title: "Improving Web Performance",
    author: "Mason Perez",
    publishedDate: "2023-02-10",
    views: 1900,
    likes: 310,
    status:  "published",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Emily",
        text: "Tips really helped my site speed.",
        date: "2023-02-11",
      },
    ],
  },
  {
    id: generateId(),

    title: "Getting Started with Tailwind CSS",
    author: "Sophia Rivera",
    publishedDate: "2023-01-05",
    views: 2300,
    likes: 400,
    status:  "published",
    content: generateContent("Async/Await in JavaScript"),

    comments: [
      {
        name: "Daniel",
        text: "Tailwind makes styling so much faster.",
        date: "2023-01-06",
      },
    ],
  },
];
