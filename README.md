# AI Outfit Planner - Wardrobe Fitter

An intelligent outfit planning application that uses AI to help users manage their wardrobe, get personalized outfit recommendations, and make informed purchase decisions.

## Features

- **User Profile Management**: Upload full-body photos and get AI-powered body type analysis
- **Digital Wardrobe**: Upload photos of your clothes and accessories with automatic AI categorization
- **Smart Outfit Recommendations**: Get AI-powered outfit suggestions for any occasion or season
- **Style Insights**: Receive personalized styling tips based on your body type and wardrobe
- **Purchase Suggestions**: Get smart recommendations for items to complete your wardrobe

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: Database ORM
- **SQLite**: Lightweight database
- **Pillow**: Image processing
- **OpenAI API**: AI-powered image analysis (optional)

### Frontend
- **React**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: State management
- **React Router**: Navigation
- **Axios**: HTTP client

## Project Structure

```
Wardrobe-fitter/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── models.py               # Database models
│   ├── schemas.py              # Pydantic schemas
│   ├── database.py             # Database configuration
│   ├── requirements.txt        # Python dependencies
│   ├── services/
│   │   ├── image_service.py    # Image upload & processing
│   │   └── ai_service.py       # AI analysis & recommendations
│   └── uploads/                # Image storage (created at runtime)
│       ├── users/              # User photos
│       └── clothing/           # Clothing item photos
└── frontend/
    ├── src/
    │   ├── components/         # Reusable React components
    │   ├── pages/              # Page components
    │   ├── store/              # Zustand state management
    │   ├── App.tsx             # Main app component
    │   └── main.tsx            # Entry point
    ├── package.json            # Node dependencies
    ├── vite.config.ts          # Vite configuration
    └── tailwind.config.js      # Tailwind CSS configuration
```

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. (Optional) Configure OpenAI API:
```bash
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

5. Run the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage Guide

### 1. Create Your Profile
- Navigate to the Profile page
- Enter your name and email
- Upload a full-body photo for AI body type analysis
- Receive personalized style recommendations

### 2. Build Your Wardrobe
- Go to the Wardrobe page
- Click "Add Item" to upload clothing photos
- Select the category (top, bottom, dress, shoes, accessory)
- AI automatically tags items with color, style, and season

### 3. Get Outfit Recommendations
- Visit the Outfit Planner page
- Select occasion (casual, formal, business, etc.)
- Optionally choose a season
- Click "Generate Outfit Ideas"
- Browse AI-generated outfit combinations
- Save your favorite outfits

### 4. Make Informed Purchases
- Review shopping suggestions based on your wardrobe gaps
- Get recommendations for versatile pieces
- Discover items that unlock new outfit combinations

## API Endpoints

### Users
- `POST /api/users/` - Create a new user
- `POST /api/users/{user_id}/photo` - Upload user photo
- `GET /api/users/{user_id}` - Get user details

### Wardrobe
- `POST /api/users/{user_id}/clothing` - Add clothing item
- `GET /api/users/{user_id}/clothing` - Get all clothing items

### Outfits
- `POST /api/users/{user_id}/outfits/generate` - Generate outfit recommendations
- `POST /api/users/{user_id}/outfits/save` - Save an outfit
- `GET /api/users/{user_id}/outfits` - Get saved outfits

## AI Features

The application uses AI for:

1. **Body Type Analysis**: Analyzes user photos to determine body type and suggest flattering styles
2. **Clothing Classification**: Automatically categorizes clothing by type, color, style, and season
3. **Outfit Generation**: Creates complementary outfit combinations based on style rules
4. **Style Recommendations**: Provides personalized styling tips and purchase suggestions

### Without OpenAI API
The app works without an API key by using intelligent rule-based recommendations. To enable advanced AI features:

1. Get an OpenAI API key from https://platform.openai.com
2. Add it to `backend/.env`
3. Restart the backend server

## Development

### Running Tests
```bash
# Backend tests (when implemented)
cd backend
pytest

# Frontend tests (when implemented)
cd frontend
npm test
```

### Building for Production

Backend:
```bash
# Use a production WSGI server like Gunicorn
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

Frontend:
```bash
npm run build
# Serve the dist/ directory with a static file server
```

## Future Enhancements

- [ ] Virtual try-on with AI image generation
- [ ] Social sharing of outfits
- [ ] Integration with online shopping platforms
- [ ] Weather-based outfit recommendations
- [ ] Outfit calendar and planning
- [ ] Style inspiration from fashion trends
- [ ] Multi-user wardrobe sharing
- [ ] Mobile app (React Native)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Built with ❤️ using FastAPI, React, and AI
