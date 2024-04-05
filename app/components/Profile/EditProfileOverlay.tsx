import { CropperImageTypes } from '@/app/types'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const EditProfileOverlay = () => {
    const router = useRouter()

    const[file, setFile] = useState<File | null>(null)
    const[cropper, setCropper] = useState<CropperImageTypes | null>(null)
    const[uploadedImage, setUploadedImage] = useState<string | null>(null)
    const[userImage, setUserImage] = useState<string | "">("");
    const[userName, setUserName] = useState<string | "">("");
    
  return (
    <div>
      
    </div>
  )
}

export default EditProfileOverlay
