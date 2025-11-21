import { Link } from 'react-router-dom'
import { Sparkles, User, Shirt, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to AI Outfit Planner
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Upload your photos, build your digital wardrobe, and get AI-powered outfit recommendations
          tailored to your style and body type.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <FeatureCard
          icon={<User className="w-12 h-12" />}
          title="Create Your Profile"
          description="Upload a full-body photo to get personalized style recommendations based on your body type."
        />
        <FeatureCard
          icon={<Shirt className="w-12 h-12" />}
          title="Build Your Wardrobe"
          description="Upload photos of your clothes and accessories. Our AI will categorize and tag them automatically."
        />
        <FeatureCard
          icon={<Sparkles className="w-12 h-12" />}
          title="Get Outfit Ideas"
          description="Receive AI-powered outfit combinations for any occasion, season, or style preference."
        />
        <FeatureCard
          icon={<TrendingUp className="w-12 h-12" />}
          title="Smart Shopping"
          description="Get personalized purchase suggestions to complete your wardrobe and unlock new outfit possibilities."
        />
      </div>

      <div className="text-center">
        <Link
          to="/profile"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Get Started
        </Link>
      </div>

      <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Step
            number="1"
            title="Upload Your Photo"
            description="Take or upload a full-body photo so our AI can analyze your body type and suggest flattering styles."
          />
          <Step
            number="2"
            title="Add Your Clothes"
            description="Upload photos of your wardrobe items. Our AI will automatically categorize them by type, color, and style."
          />
          <Step
            number="3"
            title="Plan Outfits"
            description="Get instant outfit recommendations for any occasion. Save your favorites and discover new combinations."
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
      <div className="text-purple-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
