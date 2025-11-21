import { useState } from 'react'
import ImageUpload from '../components/ImageUpload'
import { useUserStore } from '../store/userStore'
import { User, Sparkles, CheckCircle } from 'lucide-react'

export default function ProfilePage() {
  const { user, createUser, uploadUserPhoto } = useUserStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createUser({ name, email })
    } catch (error) {
      console.error('Error creating user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadPhoto = async () => {
    if (!selectedFile || !user) return

    setLoading(true)
    try {
      const result = await uploadUserPhoto(user.id, selectedFile)
      setAnalysis(result.analysis)
    } catch (error) {
      console.error('Error uploading photo:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <User className="w-12 h-12 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Create Your Profile
          </h2>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Profile'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Name:</span>
                <p className="text-lg text-gray-900">{user.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Email:</span>
                <p className="text-lg text-gray-900">{user.email}</p>
              </div>
              {user.body_type && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Body Type:</span>
                  <p className="text-lg text-gray-900 capitalize">{user.body_type}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Your Photo
            </h3>
            <ImageUpload
              onImageSelect={setSelectedFile}
              preview={user.photo_url}
              label="Upload a full-body photo"
            />
            {selectedFile && !user.photo_url && (
              <button
                onClick={handleUploadPhoto}
                disabled={loading}
                className="mt-4 w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Upload & Analyze'}
              </button>
            )}
          </div>
        </div>

        {analysis && (
          <div className="mt-8 p-6 bg-purple-50 rounded-lg">
            <div className="flex items-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                AI Style Analysis
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommended Fits:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.style_suggestions?.recommended_fits?.map((fit: string) => (
                    <span key={fit} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {fit}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Style Tips:</h4>
                <ul className="space-y-2">
                  {analysis.style_suggestions?.tips?.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
