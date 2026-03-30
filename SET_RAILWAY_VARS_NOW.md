# 🚨 URGENT: MONGODB_URI Not Set in Railway

## ❌ The Problem

Your logs show:
```
[ERROR] MONGODB_URI environment variable is required but not provided
```

**This means:** You have NOT set the MONGODB_URI in Railway's dashboard correctly.

---

## ✅ THE FIX (Copy & Paste)

### Step 1: Open Railway Dashboard
👉 **https://railway.app/**

### Step 2: Navigate to Your Service
1. Click your project
2. Click your service
3. Click **"Variables"** tab

### Step 3: Add/Update These Variables

**Variable 1: MONGODB_URI** ⚠️ CRITICAL
```
Key: MONGODB_URI
Value: mongodb+srv://sakinjahanmumu_db_user:4LMPr5tRAmxEzo7k@clustermumu.xhvr7qr.mongodb.net/zentask?retryWrites=true&w=majority&appName=Clustermumu
```

**Variable 2: JWT_ACCESS_SECRET** 
```
Key: JWT_ACCESS_SECRET
Value: (generate at https://generate-secret.vercel.app/64)
```

**Variable 3: JWT_REFRESH_SECRET**
```
Key: JWT_REFRESH_SECRET  
Value: (generate at https://generate-secret.vercel.app/64)
```

### Step 4: IMPORTANT - Check Variable Names!

Make sure you typed them EXACTLY like this:
- ✅ `MONGODB_URI` (NOT `MongoDB_URI`, NOT `mongodb_uri`)
- ✅ `JWT_ACCESS_SECRET` (NOT `JwtSecret`, NOT `ACCESS_TOKEN`)
- ✅ `JWT_REFRESH_SECRET` (NOT `RefreshToken`, NOT `REFRESH_TOKEN`)

**Railway variable names are CASE-SENSITIVE!**

### Step 5: Save and Redeploy

1. Click **"Save"** button
2. Go to **"Deployments"** tab
3. Click **"..."** → **"Redeploy"**
4. Watch the logs

---

## 🔍 What You Should See After Fix

### ✅ Success Logs:
```
Attempting to connect to MongoDB...
Connection string format: ✅ Valid SRV
✅ MongoDB Connected Successfully!
Host: ac-o5wkezc-shard-00-02.xhvr7qr.mongodb.net
Database: zentask
🚀 Server running on port 8080
📚 API Documentation: http://localhost:8080/api-docs
```

Notice:
- ✅ Port 8080 (Railway's default port)
- ✅ MongoDB connected successfully
- ✅ No error messages

---

## 🎯 Common Mistakes

### ❌ Wrong:
- Typing `MongoDB_URI` instead of `MONGODB_URI`
- Forgetting to click "Save"
- Missing query parameters (`?retryWrites=true&w=majority`)
- Not generating JWT secrets
- Setting variables in wrong place (Settings vs Variables)

### ✅ Right:
- Exact spelling: `MONGODB_URI` (all caps, underscores)
- Click "Save" after adding each variable
- Full connection string with query params
- Generate random 64-char strings for JWT secrets
- Variables tab → Add new variable

---

## 📸 Visual Guide

### Where to Add Variables:
```
Railway Dashboard
└─ Your Project
   └─ Your Service
      ├─ Deployments    ← View logs here
      ├─ Variables      ← ADD VARIABLES HERE! ⚠️
      │  └─ Click "+ New Variable"
      │     Key: MONGODB_URI
      │     Value: (paste connection string)
      ├─ Settings
      └─ Metrics
```

---

## 🧪 Quick Test

After redeploying, test your API:

```bash
# Replace YOUR_RAILWAY_URL with your actual railway.app URL
curl https://YOUR_RAILWAY_URL.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-03-30T...",
  "uptime": 123
}
```

---

## 🆘 Still Not Working?

### Checklist:
- [ ] You're in the CORRECT Railway project
- [ ] You clicked the "Variables" tab (not Settings)
- [ ] Variable name is EXACTLY `MONGODB_URI` (all caps)
- [ ] You clicked "Save" after typing
- [ ] Connection string includes `?retryWrites=true&w=majority`
- [ ] MongoDB Atlas allows 0.0.0.0/0 (Network Access)
- [ ] MongoDB cluster is running

### If Still Failing:

1. **Check MongoDB Atlas Network Access:**
   - Go to https://cloud.mongodb.com/
   - Network Access → Add IP Address
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Wait 2-3 minutes

2. **Reset MongoDB Password:**
   - Database Access → Edit User
   - Set new password
   - Update Railway variable with new password
   - Redeploy

3. **Contact Railway Support:**
   - Railway dashboard → Help
   - Or join Discord: https://discord.gg/railway

---

## 💡 Pro Tips

1. **Double-check spelling** - Case matters!
2. **Generate secure JWT secrets** - Use the link above
3. **Keep variables organized** - Use exact names shown
4. **Watch deployment logs** - They show what's failing
5. **Test health endpoint first** - It works without DB

---

## 🎉 Final Words

The error is clear: **MONGODB_URI is not set in Railway Variables**

**Action Required:**
1. Go to Railway dashboard RIGHT NOW
2. Add the MONGODB_URI variable (exact spelling!)
3. Add JWT secrets
4. Click Save
5. Redeploy

Your app will start working immediately! 🚀

---

**Need more help?** Check these files:
- `FIX_RAILWAY_MONGODB.md` - Detailed troubleshooting
- `MONGODB_FIX.md` - Complete MongoDB guide
- `DEPLOY_QUICK.md` - Quick deployment reference
