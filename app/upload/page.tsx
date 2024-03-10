'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { UploadError } from '../types'

const page = () => {

	const router = useRouter()

  let[fileDisplay, setFileDisplay] = useState<string>("")
  let[caption, setCaption] = useState<string>("")
  let[file, setFile] = useState<File  | null>(null)
  let[error, setError] = useState<UploadError | null>(null)
  let[isUploading, setIsUploading] = useState<boolean>(false)
	
  return (
	<div>
	  
	</div>
  )
}

export default page
