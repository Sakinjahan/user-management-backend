# 🔧 MongoDB Connection Troubleshooting Guide

## ❌ Current Error
```
[ERROR] Database connection error: {}
ELIFECYCLE  Command failed with exit code 1
```

This means the MongoDB connection is failing. Here's how to fix it:

---

## ✅ Solution Steps

### Step 1: Verify MongoDB URI Format

Your MongoDB connection string should look like this:
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

**Your current URI:**
```
mongodb+srv://sakinjahanmumu_db_user:4LMPr5tRAmxEzo7k@clustermumu.xhvr7qr.mongodb.net/zentask
```

### Step 2: Set Environment Variables in Railway

1. **Go to Railway Dashboard**
   - Open your project at https://railway.app/
   
2. **Navigate to Variables Tab**
   - Click on your service
   - Click "Variables" tab
   
3. **Add These Variables:**

```env
# Required Variables
PORT=5000
MONGODB_URI=mongodb+srv://sakinjahanmumu_db_user:4LMPr5tRAmxEzo7k@clustermumu.xhvr7qr.mongodb.net/zentask?retryWrites=true&w=majority
NODE_ENV=production

# JWT Secrets (Generate strong random strings)
JWT_ACCESS_SECRET=your-super-secret-access-token-min-32-chars-long
JWT_REFRESH_SECRET=your-super-secret-refresh-token-min-32-chars-long

# Token Expiry
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Frontend URL (Update with your actual frontend URL)
FRONTEND_URL=https://your-app.railway.app
```

---

## 🔍 Common Issues & Solutions

### Issue 1: Missing MONGODB_URI
**Error:** `MONGODB_URI environment variable is required`

**Solution:**
- Make sure you've added `MONGODB_URI` in Railway variables
- Variable name must be EXACTLY `MONGODB_URI` (case-sensitive)

### Issue 2: Wrong Password or Username
**Error:** `AuthenticationFailed` or `bad auth`

**Solution:**
1. Go to MongoDB Atlas: https://cloud.mongodb.com/
2. Navigate to Database Access
3. Check username and password
4. Reset password if needed and update Railway variable

### Issue 3: IP Whitelist Not Configured
**Error:** `Network timeout` or `connect ECONNREFUSED`

**Solution:**
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ This is safe for Railway as it uses VPC
4. Or add Railway's IP ranges if you want stricter security

### Issue 4: Database Name Missing
**Error:** Connection succeeds but queries fail

**Solution:**
- Ensure your URI includes the database name: `/zentask`
- Add query parameters: `?retryWrites=true&w=majority`

---

## 🧪 Test Your Connection

### Local Testing
```bash
# Install MongoDB CLI (optional)
npm install -g mongodb-cli

# Test connection string
mongosh "mongodb+srv://sakinjahanmumu_db_user:4LMPr5tRAmxEzo7k@clustermumu.xhvr7qr.mongodb.net/zentask"
```

### After Deploying to Railway

Check Railway logs:
1. Go to Railway dashboard
2. Click your service
3. Click "Deployments" tab
4. View real-time logs

Look for:
```
✅ Attempting to connect to MongoDB...
✅ MongoDB Connected: ac-o5wkezc-shard-00-02.xhvr7qr.mongodb.net
```

---

## 🛡️ Security Best Practices

### 1. Use Environment-Specific URIs
```env
# Development (Local)
MONGODB_URI=mongodb+srv://.../zentask-dev

# Production (Railway)
MONGODB_URI=mongodb+srv://.../zentask-prod
```

### 2. Generate Strong JWT Secrets
```bash
# Generate random 64-character string
openssl rand -base64 48
```

Or use online generators:
- https://generate-secret.vercel.app/64

### 3. Rotate Credentials Regularly
- Change passwords every 90 days
- Update Railway variables immediately
- Redeploy after variable changes

---

## 📋 Checklist

Before redeploying, verify:

- [ ] MONGODB_URI is set in Railway variables
- [ ] URI format is correct (includes `mongodb+srv://`)
- [ ] Username and password are correct
- [ ] Database name is included (`/zentask`)
- [ ] IP whitelist allows Railway (0.0.0.0/0)
- [ ] JWT secrets are set (min 32 characters)
- [ ] NODE_ENV is set to `production`

---

## 🔄 Quick Fix Commands

### Redeploy After Setting Variables
```bash
# If using GitHub
git commit --allow-empty -m "Trigger redeploy with fixed env vars"
git push origin main

# If using CLI
railway up
```

### Force Rebuild
In Railway dashboard:
1. Go to Deployments
2. Click "..." menu
3. Select "Redeploy"

---

## 🆘 Still Having Issues?

### 1. Check MongoDB Atlas Dashboard
- Is the cluster running?
- Are there any alerts/warnings?
- Check Metrics for connection attempts

### 2. Enable MongoDB Atlas Logs
- Go to Clusters → ... → Logs
- Enable slow query logs
- Check for authentication errors

### 3. Test with MongoDB Compass
- Download: https://www.mongodb.com/products/compass
- Paste your connection string
- Try to connect manually

### 4. Railway Support
- Check status: https://status.railway.app/
- Contact support: https://railway.app/help

---

## 💡 Pro Tips

1. **Use Separate Databases**: Dev vs Production
2. **Monitor Connections**: Atlas shows active connections
3. **Set Up Alerts**: Get notified of connection issues
4. **Backup Regularly**: Use Atlas automated backups
5. **Test Failover**: Ensure your app handles disconnections

---

**Good luck! Your deployment will work once the MongoDB URI is correctly set! 🎉**
