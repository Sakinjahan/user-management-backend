# Railway Deployment Guide

## ✅ Fixed Issues

The following changes have been made to fix the Railway deployment error:

### 1. **Swagger Configuration Updated** (`src/config/swagger.config.ts`)
- Changed glob pattern from `./src/**/*.ts` to `./dist/**/*.js`
- This prevents scanning system directories in production

### 2. **Server Configuration Updated** (`server.ts`)
- Swagger UI now only loads in development (not production)
- Prevents EPERM errors in Railway's containerized environment

### 3. **Created Railway Configuration Files**
- `railway.json` - Railway deployment configuration
- `nixpacks.toml` - Build and install instructions for Node.js + pnpm (uses `nodejs_20`)
- `.railway.toml` - Alternative Railway buildpack configuration
- `RAILWAY_DEPLOY.md` - Complete deployment guide

## 🚀 Deployment Steps

### Step 1: Install Railway CLI (if not already installed)
```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway
```bash
railway login
```

### Step 3: Initialize Railway Project
```bash
railway init
```
Select your existing project or create a new one.

### Step 4: Set Environment Variables in Railway
In the Railway dashboard, set these environment variables:

```
PORT=5000
MONGODB_URI=mongodb+srv://sakinjahanmumu_db_user:4LMPr5tRAmxEzo7k@clustermumu.xhvr7qr.mongodb.net/zentask
NODE_ENV=production
JWT_ACCESS_SECRET=your-access-token-secret-change-in-production
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-token-secret-change-in-production
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend-url.railway.app
```

### Step 5: Deploy
```bash
railway up
```

## 📋 Alternative: Deploy via GitHub

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

2. **Connect Railway to GitHub repo:**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will auto-detect the nixpacks.toml and deploy

3. **Add environment variables** in Railway dashboard

## 🔍 Troubleshooting

### Common Issues:

#### 1. **EPERM Error (Fixed)**
```
Error: EPERM: operation not permitted, scandir '/proc/1/map_files/...'
```
✅ **Solution:** Swagger now disabled in production and uses compiled JS files

#### 2. **MongoDB Connection Error**
```
MongoServerError: Authentication failed
```
✅ **Solution:** Verify MONGODB_URI is correct in Railway environment variables

#### 3. **Port Binding Error**
```
Error: listen EADDRINUSE
```
✅ **Solution:** Railway automatically sets PORT env variable, server uses it

#### 4. **Build Fails**
```
sh: 1: pnpm: not found
```
✅ **Solution:** nixpacks.toml ensures pnpm is installed. Check Railway build logs.

## 📊 Post-Deployment Checklist

- [ ] All environment variables are set in Railway
- [ ] MongoDB connection is working (check logs)
- [ ] API is accessible via Railway-provided URL
- [ ] Health check endpoint works: `https://your-app.railway.app/api/health`
- [ ] Authentication endpoints work
- [ ] Todo CRUD operations work
- [ ] CORS is configured for your frontend URL

## 🔗 Useful Endpoints After Deployment

- **Base URL:** `https://your-app.railway.app`
- **Health Check:** `https://your-app.railway.app/api/health`
- **API Routes:** `https://your-app.railway.app/api/*`
- **Swagger Docs:** Only available in development (localhost)

## 🛠️ Local Testing Before Deployment

```bash
# Build for production
pnpm build

# Test production build locally
NODE_ENV=production pnpm start
```

## 📝 Notes

- **Swagger UI** is disabled in production for security and performance
- **pnpm** is used for package management (faster and more efficient)
- **Node.js 20** is specified in nixpacks.toml for consistency
- **MongoDB Atlas** connection string should be kept secure in Railway env vars

## 🎯 Next Steps

After successful deployment:
1. Update frontend to use Railway backend URL
2. Configure CORS with your production frontend URL
3. Monitor application logs in Railway dashboard
4. Set up automatic deployments on git push (if using GitHub integration)
