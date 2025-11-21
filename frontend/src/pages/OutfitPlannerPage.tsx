import { useState } from 'react'
import { useUserStore } from '../store/userStore'
import { Sparkles, Save, Heart } from 'lucide-react'
import axios from 'axios'

export default function OutfitPlannerPage() {
  const { user, wardrobe } = useUserStore()
  const [occasion, setOccasion] = useState('casual')
  const [season, setSeason] = useState<string>('')
  const [recommendations, setRecommendations] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerateOutfits = async () => {
    if (!user) return

    setLoading(true)
    try {
      const response = await axios.post(`/api/users/${user.id}/outfits/generate`, {
        occasion,
        season: season || undefined,
      })
      setRecommendations(response.data)
    } catch (error) {
      console.error('Error generating outfits:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveOutfit = async (outfit: any, index: number) => {
    if (!user) return

    try {
      await axios.post(`/api/users/${user.id}/outfits/save`, {
        name: `${occasion} Outfit ${index + 1}`,
        occasion,
        item_ids: outfit.items,
      })
      alert('Outfit saved successfully!')
    } catch (error) {
      console.error('Error saving outfit:', error)
    }
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Please create a profile first</p>
      </div>
    )
  }

  if (wardrobe.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Add some items to your wardrobe first!</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">AI Outfit Planner</h2>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Customize Your Recommendations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Occasion
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="business">Business</option>
              <option value="date">Date Night</option>
              <option value="party">Party</option>
              <option value="workout">Workout</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Season (Optional)
            </label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Any Season</option>
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleGenerateOutfits}
          disabled={loading}
          className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {loading ? 'Generating...' : 'Generate Outfit Ideas'}
        </button>
      </div>

      {recommendations && (
        <>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Outfit Recommendations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.recommendations.map((outfit: any, index: number) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Outfit {index + 1}
                      </h4>
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 text-pink-500 mr-1" />
                        <span className="text-sm font-medium text-gray-700">{outfit.score}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {outfit.items.map((itemId: number) => {
                        const item = wardrobe.find(w => w.id === itemId)
                        return item ? (
                          <img
                            key={itemId}
                            src={`/${item.image_url}`}
                            alt={item.category}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ) : null
                      })}
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{outfit.reasoning}</p>

                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Styling Tips:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {outfit.styling_tips.slice(0, 2).map((tip: string, idx: number) => (
                          <li key={idx}>• {tip}</li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSaveOutfit(outfit, index)}
                      className="w-full py-2 bg-purple-100 text-purple-700 font-medium rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Outfit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {recommendations.shopping_suggestions && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Shopping Suggestions</h3>
              <ul className="space-y-2">
                {recommendations.shopping_suggestions.map((suggestion: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Sparkles className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}
