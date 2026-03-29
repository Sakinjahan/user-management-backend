// Test script for Todo API endpoints
const http = require('http');

console.log('🧪 Testing Todo API Endpoints...\n');

// You'll need to replace this with a valid JWT token after logging in
const TOKEN = 'YOUR_JWT_TOKEN_HERE';

// Test creating a todo
function createTodo() {
  const data = JSON.stringify({
    title: 'Test Task',
    description: 'This is a test task created via API',
    priority: 'HIGH',
    category: 'WORK'
  });

  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/todos',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Authorization': `Bearer ${TOKEN}`
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('✅ Create Todo Response:');
      console.log(JSON.stringify(JSON.parse(responseData), null, 2));
      console.log('');
      
      // Get all todos
      getAllTodos();
    });
  });

  req.on('error', (error) => {
    console.log('❌ Create Todo Error:', error.message);
  });

  req.write(data);
  req.end();
}

// Test getting all todos
function getAllTodos() {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/todos',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('✅ Get All Todos Response:');
      console.log(JSON.stringify(JSON.parse(responseData), null, 2));
      console.log('');
      
      console.log('📝 To test update and delete, replace TODO_ID with the actual todo ID from above');
      console.log('📚 Access Swagger documentation at: http://localhost:5000/api-docs');
    });
  });

  req.on('error', (error) => {
    console.log('❌ Get Todos Error:', error.message);
  });

  req.end();
}

// Uncomment to run:
// createTodo();

console.log('ℹ️  Instructions:');
console.log('1. First register/login to get a JWT token');
console.log('2. Replace YOUR_JWT_TOKEN_HERE with your actual token');
console.log('3. Uncomment createTodo() call above');
console.log('4. Run: node test-todo-api.js\n');
console.log('📚 Or test directly via Swagger UI: http://localhost:5000/api-docs');
