# AI Chatbot Automation House

A modern AI-powered chatbot application built with Next.js 15, featuring OpenAI GPT-4o integration with web search capabilities. This application provides an intuitive chat interface for interacting with AI assistants.

## ✨ Features

- **AI Chat Interface**: Clean, responsive chat UI with real-time streaming responses
- **OpenAI GPT-4o Integration**: Powered by OpenAI's latest model with web search capabilities
- **User Authentication**: Secure login system using NextAuth.js
- **Conversation Management**: Save and manage chat conversations
- **User Profiles**: User profile management system
- **Modern UI**: Built with Radix UI components and Tailwind CSS
- **Real-time Updates**: Streaming responses with loading states
- **Mobile Responsive**: Optimized for both desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **AI Integration**: OpenAI AI SDK, GPT-4o model
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI, Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **Development**: ESLint, Turbopack

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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
│   ├── ai-elements/         # AI-specific components
│   ├── auth/                # Authentication components
│   ├── chat/                # Chat interface components
│   ├── profile/             # Profile components
│   ├── sidebar/             # Navigation components
│   └── ui/                  # Reusable UI components
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

## 🎨 UI Components

The application uses a comprehensive set of UI components:
- **Radix UI**: Accessible, unstyled components
- **Tailwind CSS**: Utility-first CSS framework
- **Custom AI Elements**: Specialized components for chat interactions
- **Responsive Design**: Mobile-first approach

## 📝 TODO - Incomplete Features

> **Note**: This is not the final version of the application. Due to time constraints, several features remain unfinished or need improvement:

### High Priority
- [ ] **Enhanced Authentication**: Replace test credentials with proper user registration/login system
- [ ] **Multiple AI Models**: Support for different AI models beyond GPT-4o
- [ ] **Error Handling**: Implement proper error handling with toast notifications using Sonner
- [ ] **Testing**: Add comprehensive test suite

### Medium Priority
- [ ] **Docker Support**: Add containerization for easier deployment
- [ ] **Search Functionality**: Implement search trigger in chat input
- [ ] **Custom Dialogs**: Replace default dialogs with custom implementations
- [ ] **Asset Organization**: Move remaining SVG icons to centralized assets folder

### Low Priority
- [ ] **Performance Optimization**: Code splitting and lazy loading
- [ ] **Accessibility**: Enhanced keyboard navigation and screen reader support
- [ ] **Internationalization**: Multi-language support
- [ ] **Advanced Features**: File uploads, conversation export, chat themes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

---

**Status**: 🚧 **In Development** - This application is a work in progress with several features yet to be implemented.