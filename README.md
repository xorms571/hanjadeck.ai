# Hanjadeck.ai

Hanjadeck.ai is a modern web application designed for learning Hanja (Korean Chinese characters) through interactive, AI-generated flashcards. It provides a personalized learning experience with progress tracking and a clean, intuitive user interface.

## Key Features

*   **AI-Powered Card Generation**: Enter a Hanja character, a Korean word, or an English word to have our AI generate a detailed flashcard, complete with the character, Korean pronunciation, English definition, and example sentences.
*   **Interactive Learning**: Study with virtual flashcards that you can flip to reveal the details.
*   **Personalized Dashboard**: Keep track of your learning journey. The dashboard displays your progress, including the number of cards you've learned, mastered, and have in your review queue.
*   **Bookmark for Review**: Found a tricky character? Bookmark it to add it to your review queue for later study.
*   **User Authentication**: Secure sign-up and login to keep your learning progress saved.

## Technology Stack

*   **Framework**: [Next.js](https://nextjs.org/) (React)
*   **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/) as the ORM.
*   **AI**: [Google Generative AI](https://ai.google/) (Gemini 2.0 Flash-Lite)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Authentication**: JWT and bcrypt
*   **Language**: [TypeScript](https://www.typescriptlang.org/)

## Project Structure

*   `src/app/`: Contains the main application pages and routes.
*   `src/app/api/`: API routes for authentication, card management, etc.
*   `src/app/components/`: Reusable React components.
*   `src/lib/`: Core application logic, including AI integration (`ai.ts`), authentication (`auth.ts`), and database helpers.
*   `prisma/`: Prisma schema (`schema.prisma`) and migration files.
*   `public/`: Static assets like images and SVGs.