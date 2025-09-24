# AI Chatbot Automation House

A modern AI-powered chatbot application built with Next.js 15, featuring OpenAI GPT-4o integration with web search capabilities. This application provides an intuitive chat interface for interacting with AI assistants.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **AI Integration**: OpenAI AI SDK, GPT-4o model
- **Authentication**: NextAuth.js
- **UI Components**: Shadcn, Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/maosin77/ai-chatbot-automation-house
   cd ai-chatbot-automation-house
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here_minimum_32_characters
   ```

   **Required Environment Variables:**

   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NEXTAUTH_URL`: The base URL of your application
   - `NEXTAUTH_SECRET`: A random string (minimum 32 characters) for JWT encryption

### Running the Application

1. **Development Mode**

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

2. **Production Build**
   ```bash
   npm run build
   npm start
   ```

### Authentication

Currently using test credentials for development:

- **Email**: `test@example.com`
- **Password**: `password123`

## 📁 Project Structure

```
src/
├── app/
│   ├── (protected)/          # Protected routes requiring authentication
│   │   ├── chat/            # Chat interface pages
│   │   ├── profile/         # User profile page
│   │   └── layout.tsx       # Protected layout wrapper
│   ├── (public)/            # Public routes
│   │   └── login/           # Login page
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth configuration
│   │   └── chat/            # Chat API endpoint
│   └── layout.tsx           # Root layout
├── components/
│   ├── ai-elements/         # AI-specific components from shadcn
│   ├── auth/                # Authentication components
│   ├── chat/                # Chat interface components
│   ├── profile/             # Profile components
│   ├── sidebar/             # Navigation components
│   └── ui/                  # Reusable UI components from shadcn
├── contexts/                # React contexts
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
└── types/                   # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Note

This is not the final version of the application. The following areas need further development:

- [ ] Application needs comprehensive testing and automated tests
- [ ] User profile functionality requires refactoring
- [ ] Dockerfile for containerization needs to be created
- [ ] Speech-to-text functionality to be implemented

---

