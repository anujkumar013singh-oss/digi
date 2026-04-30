# Digi-Learners - Vercel Deployment Guide

This is a full-stack application with a React frontend (Vite) and Express backend (Node.js). This guide will help you deploy it to Vercel.

## Project Structure

```
Trae/
├── client/          # React frontend (Vite + TailwindCSS)
│   ├── src/
│   ├── package.json
│   └── vercel.json
├── server/          # Express backend
│   ├── api/
│   ├── routes/
│   ├── models/
│   ├── package.json
│   └── vercel.json
└── vercel.json      # Root configuration for monorepo deployment
```

## Prerequisites

- Vercel account (free tier works)
- MongoDB Atlas account (for database)
- Git repository (GitHub, GitLab, or Bitbucket)

## Environment Variables

### Required Environment Variables for Vercel

Add these in your Vercel project settings (Settings > Environment Variables):

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/digi-learners
NODE_ENV=production
```

### Local Development (.env files)

**Server (.env):**
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/digi-learners
PORT=5000
```

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project root:**
   ```bash
   cd /home/anuj/Documents/Trae
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? → **Yes**
   - Link to existing project? → **No** (or select existing if you have one)
   - Project name → **digi-learners** (or your preferred name)
   - Directory → **./** (current directory)
   - Override settings? → **No**

5. **Add environment variables in Vercel dashboard:**
   - Go to your project in Vercel dashboard
   - Settings > Environment Variables
   - Add `MONGO_URI` with your MongoDB connection string
   - Add `NODE_ENV` with value `production`

6. **Redeploy to apply environment variables:**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push code to Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import project in Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `./`
     - **Build Command:** `cd client && npm install && npm run build`
     - **Output Directory:** `client/dist`

3. **Add environment variables:**
   - In project settings, add:
     - `MONGO_URI` (your MongoDB connection string)
     - `NODE_ENV=production`

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy

## Configuration Files Explained

### Root vercel.json
This file handles the monorepo structure, routing API requests to the server and serving the frontend.

```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "cd client && npm install && cd ../server && npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/server/api/index.js"
    },
    {
      "source": "/(.*)",
      "destination": "/client/index.html"
    }
  ]
}
```

**Rewrites explained:**
- `/api/*` → Routes to server API
- `/*` → Routes to React frontend (SPA routing)

### Server vercel.json
Configures the Express server for serverless deployment.

```json
{
  "buildCommand": "npm install",
  "outputDirectory": ".",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/index.js"
    }
  ]
}
```

### Client vercel.json
Handles SPA routing for the React frontend.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Troubleshooting

### 404 NOT_FOUND Error

**Cause:** The old server/vercel.json used deprecated `builds` and `routes` configuration.

**Solution:** Updated to use modern `rewrites` format (already fixed in this repository).

### API Routes Not Working

**Check:**
1. Environment variables are set in Vercel dashboard
2. MongoDB connection string is correct
3. API routes are properly configured in server/api/index.js

### Frontend Not Loading

**Check:**
1. Build output directory is correct (`client/dist`)
2. Root vercel.json has correct rewrites
3. Client vercel.json has SPA routing configured

### MongoDB Connection Issues

**Check:**
1. MONGO_URI is set in Vercel environment variables
2. MongoDB Atlas allows access from anywhere (IP whitelist: 0.0.0.0/0)
3. Database user has correct permissions

## Local Development

### Start Frontend:
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### Start Backend:
```bash
cd server
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

## API Endpoints

- `GET /` - Health check
- `GET /health` - Server health status
- `POST /api/contact` - Submit contact form
- Other endpoints defined in `server/routes/`

## Technologies Used

**Frontend:**
- React 19
- Vite
- TailwindCSS 4
- Radix UI
- Framer Motion
- Lucide Icons

**Backend:**
- Express 5
- MongoDB (Mongoose)
- CORS
- Nodemailer

## Post-Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] MongoDB Atlas IP whitelist includes 0.0.0.0/0
- [ ] API endpoints are accessible
- [ ] Frontend loads correctly
- [ ] Contact form works (if applicable)
- [ ] Custom domain configured (optional)

## Support

For issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check MongoDB connection status

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Express.js](https://expressjs.com/)
