'use client'

import { useState, useRef } from 'react'
import { Camera, Image as ImageIcon, X, Upload, Loader2, AlertCircle, Check } from 'lucide-react'

interface ParcelPhotosProps {
  maxPhotos?: number
  onUpload: (files: File[]) => Promise<{ success: boolean; urls: string[]; message: string }>
  existingPhotos?: string[]
}

interface PhotoItem {
  id: string
  file?: File
  url: string
  uploading: boolean
  error?: string
}

export function ParcelPhotos({ maxPhotos = 4, onUpload, existingPhotos = [] }: ParcelPhotosProps) {
  const [photos, setPhotos] = useState<PhotoItem[]>(
    existingPhotos.map((url, i) => ({ id: `existing-${i}`, url, uploading: false }))
  )
  const [uploading, setUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')
  const cameraRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

  const addPhotos = (files: FileList | null) => {
    if (!files) return
    const remaining = maxPhotos - photos.length
    if (remaining <= 0) return

    const newPhotos: PhotoItem[] = Array.from(files)
      .slice(0, remaining)
      .filter(file => {
        if (!file.type.startsWith('image/')) return false
        if (file.size > 10 * 1024 * 1024) return false // 10MB limit
        return true
      })
      .map(file => ({
        id: `photo-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        url: URL.createObjectURL(file),
        uploading: false,
      }))

    setPhotos(prev => [...prev, ...newPhotos])
  }

  const removePhoto = (id: string) => {
    setPhotos(prev => {
      const photo = prev.find(p => p.id === id)
      if (photo?.file) URL.revokeObjectURL(photo.url)
      return prev.filter(p => p.id !== id)
    })
  }

  const handleUploadAll = async () => {
    const filesToUpload = photos.filter(p => p.file).map(p => p.file!)
    if (filesToUpload.length === 0) return

    setUploading(true)
    setUploadMessage('')
    try {
      const result = await onUpload(filesToUpload)
      if (result.success) {
        setUploadMessage(`${filesToUpload.length} photo(s) uploaded successfully`)
        // Mark all as uploaded (no more file reference)
        setPhotos(prev => prev.map(p => ({ ...p, file: undefined, uploading: false })))
      } else {
        setUploadMessage(result.message || 'Upload failed')
      }
    } catch {
      setUploadMessage('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const hasNewPhotos = photos.some(p => p.file)
  const canAddMore = photos.length < maxPhotos

  return (
    <div className="parcel-photos">
      <div className="parcel-photos-header">
        <b>Parcel photos</b>
        <small>{photos.length}/{maxPhotos} captured</small>
      </div>

      <div className="parcel-photos-grid">
        {photos.map(photo => (
          <div key={photo.id} className="parcel-photo-item">
            <img src={photo.url} alt="Parcel photo" />
            {!uploading && (
              <button
                className="parcel-photo-remove"
                onClick={() => removePhoto(photo.id)}
                aria-label="Remove photo"
              >
                <X size={12} />
              </button>
            )}
            {photo.file && <span className="parcel-photo-badge">New</span>}
          </div>
        ))}

        {canAddMore && (
          <>
            <button
              className="parcel-photo-add"
              onClick={() => cameraRef.current?.click()}
              aria-label="Take photo with camera"
            >
              <Camera size={20} />
              <span>Camera</span>
            </button>
            <button
              className="parcel-photo-add"
              onClick={() => galleryRef.current?.click()}
              aria-label="Choose from gallery"
            >
              <ImageIcon size={20} />
              <span>Gallery</span>
            </button>
          </>
        )}
      </div>

      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={e => { addPhotos(e.target.files); e.target.value = '' }}
        hidden
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        multiple
        onChange={e => { addPhotos(e.target.files); e.target.value = '' }}
        hidden
      />

      {uploadMessage && (
        <div className={`parcel-upload-msg ${uploadMessage.includes('failed') ? 'error' : 'success'}`}>
          {uploadMessage.includes('failed') ? <AlertCircle size={14} /> : <Check size={14} />}
          {uploadMessage}
        </div>
      )}

      {hasNewPhotos && (
        <button
          className="partner-button"
          onClick={handleUploadAll}
          disabled={uploading}
          style={{ width: '100%', marginTop: 12 }}
        >
          {uploading ? <><Loader2 size={15} className="slide-spinner" /> Uploading...</> : <><Upload size={15} /> Upload {photos.filter(p => p.file).length} photo(s)</>}
        </button>
      )}
    </div>
  )
}
