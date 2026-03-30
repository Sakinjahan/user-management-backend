
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import apiRoutes from './src/routes';
import swaggerUi from 'swagger-ui-express';
import connectDB from './src/config/db';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect to database
connectDB().catch((err) => {
  console.error('Failed to connect to database:', err);
  // Don't exit - allow server to start for health checks
  // This helps with Railway deployment debugging
});

// Routes
app.use('/api', apiRoutes);

// Swagger UI documentation (only in development)
if (process.env.NODE_ENV !== 'production') {
  // Load swagger config synchronously for development
  let swaggerSpec: any;
  try {
    const swaggerModule = require('./src/config/swagger.config');
    swaggerSpec = swaggerModule.default || swaggerModule;
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        deepLinking: true,
        docExpansion: 'list',
        filter: true
      },
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Zentask API Documentation'
    }));
    console.log('✅ Swagger UI loaded at http://localhost:' + PORT + '/api-docs');
  } catch (err: any) {
    console.warn('Swagger documentation not available:', err.message);
  }
}

// Centralized Error Handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error occurred:', err);
  
  // Prevent exposing sensitive error details to client
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error'
    : err.message; 
     
  res.status(500).send({ error: errorMessage });
});

// Handle 404 for undefined routes
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});

