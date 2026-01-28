# ChatGPT Clone

A full-featured ChatGPT clone built with Next.js 14, TypeScript, and the OpenAI GPT-4o API. Features a two-column interface with conversation management and real-time chat.

## Features

- 🎨 Modern two-column interface (conversation list + chat)
- 💬 Real-time chat with GPT-4o
- 📝 Multiple conversation management
- 🗑️ Delete conversations
- 🎯 Automatic conversation titling
- 🌙 Dark mode UI
- ⚡ Built with Next.js 14 App Router
- 🎨 Styled with Tailwind CSS

## Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your OpenAI API key:**
   
   Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   You can copy `.env.local.example` and fill in your key.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
chatgpt-clone/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # OpenAI API integration
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page with state management
│   └── globals.css               # Global styles
├── components/
│   ├── Sidebar.tsx               # Conversation list sidebar
│   ├── ChatInterface.tsx         # Main chat interface
│   └── MessageList.tsx           # Message display component
└── .env.local                    # Environment variables (create this)
```

## How It Works

1. **Conversation Management**: Create new conversations, switch between them, and delete old ones
2. **Chat Interface**: Type messages and get responses from GPT-4o
3. **Auto-naming**: The first message in a conversation automatically becomes its title
4. **Persistent UI**: Conversations are stored in React state (can be extended to use a database)

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful hand-crafted SVG icons
- **OpenAI API**: GPT-4o language model

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Building for Production

```bash
npm run build
npm start
```

## Notes

- Make sure your OpenAI API key has sufficient credits
- The app uses the `gpt-4o` model by default
- Conversations are currently stored in React state (not persisted on refresh)

## License

MIT
