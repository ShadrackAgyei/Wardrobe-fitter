# Quick Setup Guide

## 5-Minute Quick Start

### Option 1: Run Both Servers Simultaneously

**Terminal 1 - Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open your browser to `http://localhost:5173`

### Option 2: Using Shell Scripts (Coming Soon)

We'll add convenience scripts for one-command startup.

## First-Time Setup Checklist

- [ ] Install Python 3.9+
- [ ] Install Node.js 18+
- [ ] Clone the repository
- [ ] Set up backend (see Terminal 1 above)
- [ ] Set up frontend (see Terminal 2 above)
- [ ] (Optional) Configure OpenAI API key in `backend/.env`

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Find and kill the process using port 8000
# Linux/Mac:
lsof -ti:8000 | xargs kill -9
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Module not found:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Issues

**Port 5173 already in use:**
```bash
# Kill process on port 5173
# Linux/Mac:
lsof -ti:5173 | xargs kill -9
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**Dependencies not installing:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### API Connection Issues

If frontend can't connect to backend:

1. Verify backend is running on `http://localhost:8000`
2. Check browser console for CORS errors
3. Ensure both servers are running
4. Try accessing `http://localhost:8000` directly

## Testing the Application

1. **Create a profile**: Go to Profile page, enter name/email
2. **Upload your photo**: Add a full-body photo for analysis
3. **Add wardrobe items**: Go to Wardrobe, upload 3-5 clothing items
4. **Generate outfits**: Visit Outfit Planner, select occasion, generate recommendations

## Optional: Enable AI Features

For enhanced AI capabilities:

1. Get OpenAI API key: https://platform.openai.com/api-keys
2. Create `backend/.env` file:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
3. Restart backend server

Without an API key, the app uses intelligent rule-based recommendations.

## Production Deployment

### Backend (Example using Heroku)
```bash
# Install Heroku CLI and login
heroku create your-app-name
heroku addons:create heroku-postgresql
git push heroku main
```

### Frontend (Example using Vercel)
```bash
# Install Vercel CLI
npm i -g vercel
cd frontend
vercel
```

### Environment Variables for Production

Backend:
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API key
- `UPLOAD_DIR`: Cloud storage path

Frontend:
- `VITE_API_URL`: Backend API URL

## Need Help?

- Check the main README.md for detailed documentation
- Open an issue on GitHub
- Review API documentation at `http://localhost:8000/docs`
