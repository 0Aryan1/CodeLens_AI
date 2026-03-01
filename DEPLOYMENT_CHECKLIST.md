# Quick Deployment Checklist ✅

## Before Deploying

- [ ] Commit all changes to Git
- [ ] Push to GitHub repository
- [ ] Have your Google GenAI API key ready

## Backend Deployment

1. [ ] Go to [vercel.com](https://vercel.com)
2. [ ] Click "Add New" → "Project"
3. [ ] Import your GitHub repo
4. [ ] Set Root Directory: `Backend`
5. [ ] Add Environment Variables:
   - `NODE_ENV` = `production`
   - `GOOGLE_API_KEY` = `your_actual_api_key`
6. [ ] Click Deploy
7. [ ] Copy the deployed backend URL

## Frontend Deployment

1. [ ] Go to [vercel.com](https://vercel.com)
2. [ ] Click "Add New" → "Project"
3. [ ] Import the SAME GitHub repo again
4. [ ] Set Root Directory: `Frontend`
5. [ ] Framework Preset: Vite (auto-detected)
6. [ ] Add Environment Variable:
   - `VITE_API_URL` = `your_backend_url_from_above`
7. [ ] Click Deploy
8. [ ] Copy the deployed frontend URL

## After Deployment

1. [ ] Update CORS in `Backend/src/app.js`:
   - Add your frontend URL to `allowedOrigins` array
2. [ ] Commit and push:
   ```bash
   git add .
   git commit -m "Add production frontend URL to CORS"
   git push
   ```
3. [ ] Wait for automatic redeployment
4. [ ] Test your app!

## Files Modified

✅ `Backend/vercel.json` - Created
✅ `Backend/server.js` - Updated for Vercel
✅ `Backend/package.json` - Added start script
✅ `Backend/.gitignore` - Created
✅ `Backend/src/app.js` - Updated CORS
✅ `Frontend/.env` - Created
✅ `Frontend/.env.example` - Created
✅ `Frontend/src/App.jsx` - Updated API URL
✅ `DEPLOYMENT.md` - Full guide created

## Need Help?

Check `DEPLOYMENT.md` for detailed instructions!
