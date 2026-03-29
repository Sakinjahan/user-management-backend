# Zentask Backend API

Advanced productivity backend API built with Node.js, Express, TypeScript, and MongoDB.

## Features

- ✅ RESTful API for todo management
- ✅ Full user authentication system (register/login)
- ✅ JWT-based authentication with secure tokens
- ✅ Protected routes with authentication middleware
- ✅ MongoDB integration with Mongoose
- ✅ Input validation and sanitization
- ✅ Health check endpoints for monitoring
- ✅ Swagger/OpenAPI documentation
- ✅ Environment-based configuration
- ✅ Comprehensive error handling
- ✅ TypeScript support

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- pnpm (recommended) or npm

## Installation

1. Install dependencies:
```bash
pnpm install
# or
npm install
```

2. Configure environment variables:
```bash
# Copy the .env.example to .env and update values
cp .env.example .env
```

Update the `.env` file with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=development
```

## Available Scripts

```bash
# Start development server with nodemon (auto-restart on file changes)
pnpm dev
# or
npm run dev

# Alternative Windows batch script (handles PowerShell restrictions)
start-dev.bat

# Build for production
pnpm build
# or
npm run build

# Start production server
pnpm start
# or
npm start

# Build and serve (production)
npm run serve
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (fullName, email, password)
- `POST /api/auth/login` - User login (email, password)
- `GET /api/auth/profile` - Get current user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)
- `PUT /api/auth/change-password` - Change password (requires auth)

### Health Check
- `GET /api/health` - Basic health status
- `GET /api/health/details` - Detailed system metrics

### Todo Management (requires authentication)
- `GET /api/todos` - Get all todos (with optional filtering)
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### API Documentation
- `GET /api-docs` - Swagger UI documentation

## Query Parameters for Todos

Filter todos using query parameters:
- `category` - Filter by category (WORK, PERSONAL, HEALTH, FINANCE, OTHER)
- `priority` - Filter by priority (LOW, MEDIUM, HIGH, URGENT)
- `search` - Search in title or description

Example: `/api/todos?category=WORK&priority=HIGH&search=meeting`

## Data Models

### Todo
```typescript
{
  title: string;          // Required
  description?: string;   // Optional
  completed: boolean;     // Default: false
  priority: string;       // LOW | MEDIUM | HIGH | URGENT
  category: string;       // WORK | PERSONAL | HEALTH | FINANCE | OTHER
  subTasks: Array<{       // Optional sub-tasks
    id: string;
    title: string;
    completed: boolean;
  }>;
  createdAt: Date;
}
```

## Health Check Response

The health endpoints provide monitoring information:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "uptime": 1234.56,
  "database": {
    "connected": true,
    "status": "connected"
  },
  "memory": {
    "rss": "45 MB",
    "heapTotal": "32 MB",
    "heapUsed": "28 MB"
  }
}
```

## Swagger Documentation

Access the interactive API documentation at:
```
http://localhost:5000/api-docs
```

The Swagger UI provides:
- Interactive API testing
- Endpoint documentation
- Request/response examples
- Schema definitions

## Security Features

- JWT-based authentication with secure tokens
- Password hashing using bcrypt
- Input sanitization to prevent injection attacks
- Enum validation for priority and category fields
- Error handling that doesn't expose sensitive information
- CORS configuration for controlled access
- Protected routes requiring authentication
- Email validation using validator library

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | Required |
| NODE_ENV | Environment (development/production) | development |

## Development

The project uses TypeScript with strict type checking. All source files are compiled to JavaScript in the `dist` folder.

### Nodemon Features
- **Auto-restart**: Server automatically restarts when TypeScript files change
- **File watching**: Monitors `.ts` and `.json` files in the project
- **Smart ignores**: Excludes `node_modules`, `dist`, and test files
- **Delay**: 500ms delay prevents rapid restarts during bulk changes
- **Environment**: Sets `NODE_ENV=development` automatically

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - see LICENSE file for details.