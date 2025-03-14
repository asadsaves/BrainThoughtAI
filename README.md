# BrainThought - AI Chat Assistant
Live- https://asad-brainthought-ai.vercel.app/
A modern AI chat application built with Next.js 14, TypeScript, and Together AI. Features a ChatGPT-like interface with real-time streaming responses and dark mode support.

## Features

- Modern, responsive UI with ChatGPT-like design
- Real-time streaming responses from Together AI's Mixtral-8x7B model
- Dark mode support with smooth transitions
- Auto-expanding input field
- Message history with timestamps
- Mobile-friendly design
- Keyboard shortcuts (Enter to send, Shift + Enter for new line)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Together AI (Mixtral-8x7B-Instruct model)
- next-themes for dark mode

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Together AI API key:
   ```
   TOGETHER_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

- `TOGETHER_API_KEY`: Your Together AI API key

## Usage

- Type your message in the input field
- Press Enter to send (or use the send button)
- Use Shift + Enter for new lines
## Technologies used
This doesn't really matter, but is useful for the AI to understand more about this project. We are using the following technologies
- React with Next.js 14 App Router
- TailwindCSS
- Firebase Auth, Storage, and Database
- Multiple AI endpoints including OpenAI, Anthropic, and Replicate using Vercel's AI SDK
