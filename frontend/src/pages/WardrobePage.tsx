import { useState, useEffect } from 'react'
import ImageUpload from '../components/ImageUpload'
import { useUserStore } from '../store/userStore'
import { Shirt, Plus, Filter } from 'lucide-react'

export default function WardrobePage() {
  const { user, wardrobe, loadWardrobe, addClothingItem } = useUserStore()
  const [showUpload, setShowUpload] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [category, setCategory] = useState('top')
  const [loading, setLoading] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  useEffect(() => {
    if (user) {
      loadWardrobe(user.id)
    }
  }, [user, loadWardrobe])

  const handleUpload = async () => {
    if (!selectedFile || !user) return

    setLoading(true)
    try {
      await addClothingItem(user.id, selectedFile, category)
      setSelectedFile(null)
      setShowUpload(false)
    } catch (error) {
      console.error('Error uploading clothing:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', 'top', 'bottom', 'dress', 'outerwear', 'shoes', 'accessory']

  const filteredWardrobe = filterCategory === 'all'
    ? wardrobe
    : wardrobe.filter(item => item.category === filterCategory)

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Please create a profile first</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Wardrobe</h2>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Item
        </button>
      </div>

      {showUpload && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Clothing Item</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ImageUpload
              onImageSelect={setSelectedFile}
              label="Upload a photo of the clothing item"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="dress">Dress</option>
                <option value="outerwear">Outerwear</option>
                <option value="shoes">Shoes</option>
                <option value="accessory">Accessory</option>
              </select>
              {selectedFile && (
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="mt-4 w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Add to Wardrobe'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredWardrobe.length === 0 ? (
        <div className="text-center py-12">
          <Shirt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">No items in your wardrobe yet</p>
          <p className="text-gray-500 mt-2">Start by adding some clothing items!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredWardrobe.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={`/${item.image_url}`}
                alt={item.category}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-semibold text-gray-900 capitalize">
                    {item.category}
                  </span>
                  {item.color && (
                    <span
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: item.color }}
                      title={item.color}
                    />
                  )}
                </div>
                {item.style && (
                  <p className="text-sm text-gray-600 capitalize">{item.style}</p>
                )}
                {item.ai_tags && item.ai_tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.ai_tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
