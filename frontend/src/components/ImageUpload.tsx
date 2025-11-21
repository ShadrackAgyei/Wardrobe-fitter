import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  preview?: string
  label?: string
}

export default function ImageUpload({ onImageSelect, preview, label = 'Upload Image' }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(preview)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      onImageSelect(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }, [onImageSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1
  })

  const clearImage = () => {
    setPreviewUrl(undefined)
  }

  return (
    <div className="w-full">
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          {isDragActive ? (
            <p className="text-purple-600 font-medium">Drop the image here...</p>
          ) : (
            <>
              <p className="text-gray-600 font-medium mb-2">{label}</p>
              <p className="text-sm text-gray-500">
                Drag & drop an image here, or click to select
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
