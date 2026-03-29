// Script to install dependencies using Node.js
const { execSync } = require('child_process');
const fs = require('fs');

console.log('Installing dependencies for Zentask backend...');

try {
  // Read the package.json to confirm it exists
  if (!fs.existsSync('./package.json')) {
    console.error('Error: package.json not found!');
    process.exit(1);
  }

  console.log('Running pnpm install...');
  
  // Try to install with pnpm if available
  try {
    execSync('npx pnpm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully with pnpm!');
  } catch (pnpmErr) {
    console.log('pnpm not available, trying npm instead...');
    try {
      // Fallback to npm
      execSync('npm install', { stdio: 'inherit' });
      console.log('✅ Dependencies installed successfully with npm!');
    } catch (npmErr) {
      console.error('❌ Failed to install dependencies with both pnpm and npm');
      console.error(npmErr.message);
      process.exit(1);
    }
  }
} catch (error) {
  console.error('❌ Error during installation:', error.message);
  process.exit(1);
}

console.log('🎉 Backend dependencies installed successfully!');