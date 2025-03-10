# Legal Assistant

A modern web application for legal professionals to manage and analyze contracts using AI. Built with React, Node.js, and OpenAI integration.

## Features

### Authentication & User Management
- Secure user registration and login
- JWT-based authentication with refresh token support
- Protected routes and API endpoints
- Centralized authentication state management

### Contract Management
- Upload and store legal contracts (PDF format)
- View and manage contract details
- Organize contracts by type and status
- Track contract metadata and history

### AI-Powered Contract Analysis
- Automated contract risk assessment
- Identification of potential legal issues
- Analysis of contract terms and clauses
- Recommendations for improvements
- Extraction of key contract information:
  - Contract type and purpose
  - Party information
  - Payment terms
  - Duration and dates
  - Special clauses (confidentiality, non-compete)

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components
- Vite for build tooling
- Axios for API communication
- Context API for state management

### Backend
- Node.js with TypeScript
- Express.js for API routing
- Prisma as ORM
- PostgreSQL database
- JWT for authentication
- OpenAI API integration
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- OpenAI API key

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/vitto-vitto/legal-assistant.git
cd legal-assistant
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:

Create `.env` file in the server directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/legal_assistant"
JWT_SECRET="your-jwt-secret"
OPENAI_API_KEY="your-openai-api-key"
PORT=3001
```

Create `.env` file in the client directory:
```env
VITE_API_URL="http://localhost:3001/api"
```

4. Set up the database:
```bash
cd server
npx prisma migrate dev
npx prisma db seed
```

### Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Project Structure

```
legal-assistant/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── contexts/      # React Context providers
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service layers
│   │   └── types/        # TypeScript type definitions
│   └── public/           # Static assets
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Express middleware
│   │   ├── routes/      # API route definitions
│   │   ├── services/    # Business logic
│   │   └── types/       # TypeScript type definitions
│   └── prisma/          # Database schema and migrations
└── package.json         # Root package.json
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

### Contract Endpoints
- `POST /api/contracts` - Create a new contract
- `GET /api/contracts` - List all contracts
- `GET /api/contracts/:id` - Get contract details
- `PUT /api/contracts/:id` - Update contract
- `DELETE /api/contracts/:id` - Delete contract
- `POST /api/contracts/:id/analyze` - Analyze contract with AI

### Upload Endpoints
- `POST /api/upload/contract` - Upload contract PDF
- `GET /api/upload/contracts` - List uploaded contracts

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
