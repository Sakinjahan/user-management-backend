# 🚀 Quick Railway Deployment Guide

## ⚡ Fast Track (Recommended)

### 1. Push to GitHub
```bash
git add .
git commit -m "Deploy to Railway with fixed nixpacks config"
git push origin main
```

### 2. Deploy via Railway Dashboard
1. Go to [Railway](https://railway.app/)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway will auto-detect and deploy!

### 3. Set Environment Variables
In Railway dashboard → Variables → Add these:
```env
PORT=5000
MONGODB_URI=mongodb+srv://sakinjahanmumu_db_user:4LMPr5tRAmxEzo7k@clustermumu.xhvr7qr.mongodb.net/zentask
NODE_ENV=production
JWT_ACCESS_SECRET=your-secure-random-secret-here
JWT_REFRESH_SECRET=another-secure-random-secret-here
FRONTEND_URL=https://your-app.railway.app
```

### 4. Done! ✅
Your API will be live at `https://your-app.railway.app`

---

## 🛠️ Alternative: Railway CLI

```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

## 🔧 What Was Fixed

### Problem:
```
error: undefined variable 'nodejs-20_x'
```

### Solution:
Changed `nixpacks.toml` from:
```toml
nixPkgs = ["nodejs-20_x", "pnpm"]  # ❌ Wrong
```

To:
```toml
nixPkgs = ["nodejs_20", "pnpm"]    # ✅ Correct
```

---

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] All environment variables set in Railway
- [ ] MongoDB connection string is correct
- [ ] JWT secrets are strong random strings
- [ ] Frontend URL is updated (if applicable)

---

## 🧪 Test Your Deployment

After deployment, test these endpoints:

```bash
# Health Check
curl https://your-app.railway.app/api/health

# Register User
curl -X POST https://your-app.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123"}'

# Get Todos (requires auth token)
curl https://your-app.railway.app/api/todos \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🐛 Troubleshooting

### Build Fails with Node.js Version Error
✅ **Fixed!** The `nixpacks.toml` now uses correct package name `nodejs_20`

### MongoDB Connection Fails
- Check MONGODB_URI is correct
- Ensure IP access is allowed in MongoDB Atlas (0.0.0.0/0 for Railway)

### Port Errors
- Railway sets PORT automatically via environment variable
- Server already configured to use `process.env.PORT`

---

## 📞 Need Help?

1. Check Railway deployment logs in dashboard
2. Review full guide: `RAILWAY_DEPLOY.md`
3. Railway support: https://railway.app/help

---

**Good luck with your deployment! 🎉**
