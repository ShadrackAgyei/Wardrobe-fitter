import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import WardrobePage from './pages/WardrobePage'
import OutfitPlannerPage from './pages/OutfitPlannerPage'
import Navigation from './components/Navigation'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wardrobe" element={<WardrobePage />} />
          <Route path="/planner" element={<OutfitPlannerPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
