const { execSync } = require('child_process');

try {
  console.log('Starting Zentask Backend Development Server...');
  console.log('=============================================');
  console.log('Starting development server with nodemon...');
  
  // Try pnpm first, fall back to npm if pnpm is not available
  const cmd = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  
  execSync(`${cmd} run dev`, { 
    stdio: 'inherit',
    cwd: __dirname
  });
} catch (error) {
  console.log('pnpm not found, trying npm...');
  try {
    const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    execSync(`${cmd} run dev`, { 
      stdio: 'inherit', 
      cwd: __dirname 
    });
  } catch (npmError) {
    console.error('Neither pnpm nor npm worked. Please install either pnpm or npm.');
    console.error('Original pnpm error:', error.message);
    console.error('npm error:', npmError.message);
    process.exit(1);
  }
}