// Test script for health routes
const http = require('http');

console.log('🧪 Testing Zentask Backend Health Routes...\n');

// Test basic health endpoint
const healthOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/health',
  method: 'GET'
};

const healthReq = http.request(healthOptions, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ Basic Health Check:');
    console.log(JSON.stringify(JSON.parse(data), null, 2));
    console.log('');
    
    // Test detailed health endpoint
    testDetailedHealth();
  });
});

healthReq.on('error', (error) => {
  console.log('❌ Basic Health Check Failed:');
  console.log('Error:', error.message);
  console.log('Make sure the server is running on port 5000');
});

healthReq.end();

function testDetailedHealth() {
  const detailedOptions = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/health/details',
    method: 'GET'
  };

  const detailedReq = http.request(detailedOptions, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('✅ Detailed Health Check:');
      console.log(JSON.stringify(JSON.parse(data), null, 2));
      console.log('');
      
      console.log('🎯 Health route testing completed!');
      console.log('📊 Access Swagger documentation at: http://localhost:5000/api-docs');
    });
  });

  detailedReq.on('error', (error) => {
    console.log('❌ Detailed Health Check Failed:');
    console.log('Error:', error.message);
  });

  detailedReq.end();
}