import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Zentask API Documentation',
      version: version || '1.0.0',
      description: 'Advanced Productivity Backend API for Zentask AI application',
      contact: {
        name: 'Zentask API Support',
        email: 'support@zentask.ai'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server'
      },
      {
        url: 'https://your-production-url.com/api',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        JWT: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token to access protected routes'
        }
      },
      schemas: {
        Todo: {
          type: 'object',
          required: ['title'],
          properties: {
            id: {
              type: 'string',
              description: 'Auto-generated MongoDB ID'
            },
            title: {
              type: 'string',
              description: 'Todo item title',
              example: 'Complete project documentation'
            },
            description: {
              type: 'string',
              description: 'Detailed description of the todo item',
              example: 'Write comprehensive documentation for the Zentask API'
            },
            completed: {
              type: 'boolean',
              description: 'Completion status of the todo item',
              example: false
            },
            priority: {
              type: 'string',
              enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
              description: 'Priority level of the todo item',
              example: 'MEDIUM'
            },
            category: {
              type: 'string',
              enum: ['WORK', 'PERSONAL', 'HEALTH', 'FINANCE', 'OTHER'],
              description: 'Category classification for the todo item',
              example: 'WORK'
            },
            subTasks: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string'
                  },
                  title: {
                    type: 'string'
                  },
                  completed: {
                    type: 'boolean'
                  }
                }
              },
              description: 'List of sub-tasks for this todo item'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the todo was created'
            }
          }
        },
        HealthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['healthy', 'unhealthy'],
              description: 'Overall health status'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              description: 'Current timestamp'
            },
            uptime: {
              type: 'number',
              description: 'Service uptime in seconds'
            },
            database: {
              type: 'object',
              properties: {
                connected: {
                  type: 'boolean'
                },
                status: {
                  type: 'string',
                  enum: ['connected', 'disconnected']
                }
              }
            },
            memory: {
              type: 'object',
              properties: {
                rss: {
                  type: 'string'
                },
                heapTotal: {
                  type: 'string'
                },
                heapUsed: {
                  type: 'string'
                }
              }
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated MongoDB ID'
            },
            fullName: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              description: 'User email address',
              example: 'john@example.com'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indicates if the request was successful'
            },
            message: {
              type: 'string',
              description: 'Response message'
            },
            user: {
              $ref: '#/components/schemas/User'
            },
            token: {
              type: 'string',
              description: 'JWT token for authentication'
            }
          }
        }
      },
      responses: {
        BadRequest: {
          description: 'Bad Request - Invalid input data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Validation error or invalid data provided'
                  }
                }
              }
            }
          }
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Todo not found'
                  }
                }
              }
            }
          }
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Internal server error'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./dist/**/*.js'] // Path to the compiled API docs
};

export default swaggerJSDoc(swaggerOptions);