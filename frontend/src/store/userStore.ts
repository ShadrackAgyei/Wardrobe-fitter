import { create } from 'zustand'
import axios from 'axios'

interface User {
  id: number
  name: string
  email: string
  photo_url?: string
  body_type?: string
  created_at: string
}

interface ClothingItem {
  id: number
  user_id: number
  image_url: string
  category: string
  color?: string
  style?: string
  season?: string
  ai_tags?: string[]
  created_at: string
}

interface UserStore {
  user: User | null
  wardrobe: ClothingItem[]
  createUser: (userData: { name: string; email: string }) => Promise<void>
  uploadUserPhoto: (userId: number, file: File) => Promise<any>
  loadWardrobe: (userId: number) => Promise<void>
  addClothingItem: (userId: number, file: File, category: string) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  wardrobe: [],

  createUser: async (userData) => {
    try {
      const response = await axios.post('/api/users/', userData)
      set({ user: response.data })
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  },

  uploadUserPhoto: async (userId, file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await axios.post(`/api/users/${userId}/photo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      // Reload user data
      const userResponse = await axios.get(`/api/users/${userId}`)
      set({ user: userResponse.data })

      return response.data
    } catch (error) {
      console.error('Error uploading photo:', error)
      throw error
    }
  },

  loadWardrobe: async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}/clothing`)
      set({ wardrobe: response.data })
    } catch (error) {
      console.error('Error loading wardrobe:', error)
      throw error
    }
  },

  addClothingItem: async (userId, file, category) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', category)

      const response = await axios.post(`/api/users/${userId}/clothing`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      // Reload wardrobe
      const wardrobeResponse = await axios.get(`/api/users/${userId}/clothing`)
      set({ wardrobe: wardrobeResponse.data })
    } catch (error) {
      console.error('Error adding clothing item:', error)
      throw error
    }
  }
}))
