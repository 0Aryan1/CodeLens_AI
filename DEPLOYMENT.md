# Code Review App - Deployment Guide

## 🚀 Deploying to Vercel

This project consists of two parts:
1. **Backend** - Express.js API
2. **Frontend** - React + Vite application

### Prerequisites
- [Vercel Account](https://vercel.com) (free tier works)
- [GitHub Account](https://github.com)
- Git installed locally

---

## 📝 Step-by-Step Deployment Instructions

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   cd /Users/aryanagrawal/Downloads/codeReview
   git init
   git add .
   git commit -m "Initial commit - Code Review App"
   ```

2. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (e.g., "code-review-app")
   - Don't initialize with README (we already have code)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Deploy Backend to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New" → "Project"**

3. **Import your GitHub repository**

4. **Configure Backend Project**:
   - **Root Directory**: Select `Backend`
   - **Framework Preset**: Other
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   - `NODE_ENV` = `production`
   - Add any other environment variables from your `.env` file (e.g., API keys for Google GenAI)
   - Example: `GOOGLE_API_KEY` = `your_api_key_here`

6. **Deploy** - Click "Deploy" button

7. **Save Backend URL**: After deployment, copy the URL (e.g., `https://your-backend.vercel.app`)

---

### Step 3: Deploy Frontend to Vercel

1. **Go back to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New" → "Project"**

3. **Import the SAME GitHub repository again**

4. **Configure Frontend Project**:
   - **Root Directory**: Select `Frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   - `VITE_API_URL` = `https://your-backend.vercel.app` (use the URL from Step 2)

6. **Deploy** - Click "Deploy" button

---

### Step 4: Update Backend CORS Settings

After both deployments, you need to update CORS to allow your frontend URL.

Update `Backend/src/app.js`:

```javascript
const express = require('express');
const aiRoutes = require('./routes/ai.route.js')
const cors = require('cors')

const app = express();

// Update CORS to allow your Vercel frontend URL
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000', 
  'https://your-frontend.vercel.app' // Add your actual frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Rest of your code...
```

Then push the changes:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Vercel will automatically redeploy.

---

## 🔑 Important Environment Variables

### Backend (.env)
```env
NODE_ENV=production
GOOGLE_API_KEY=your_google_genai_api_key
# Add any other API keys or secrets
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.vercel.app
```

---

## 🧪 Testing Your Deployment

1. Visit your frontend URL (e.g., `https://your-frontend.vercel.app`)
2. Paste some code in the editor
3. Click "Review" button
4. Check if the AI code review appears

---

## 🐛 Troubleshooting

### Issue: "Unable to connect to the server"
- Check if backend is deployed correctly
- Verify `VITE_API_URL` environment variable in frontend
- Check backend logs in Vercel dashboard

### Issue: CORS errors
- Make sure you updated the CORS settings in backend
- Add your frontend Vercel URL to allowed origins

### Issue: "API Key not found"
- Make sure you added environment variables in Vercel dashboard
- Redeploy after adding environment variables

---

## 📱 Custom Domain (Optional)

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## 🔄 Automatic Deployments

Once connected to GitHub, Vercel will automatically deploy:
- Every push to `main` branch → Production deployment
- Every pull request → Preview deployment

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)

---

## ✅ Success!

Your Code Review App should now be live on Vercel! 🎉

Frontend URL: `https://your-frontend.vercel.app`
Backend URL: `https://your-backend.vercel.app`
