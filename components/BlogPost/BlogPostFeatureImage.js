import cs from 'classnames'
import { useState, useRef } from 'react'
import { uploadFeatureImageToServer } from 'actions/post'
import { ButtonLoadingIcon } from 'components/Button'
import UploadFileIcon from 'assets/upload-file-icon.svg'

export default function BlogPostFeatureImage({ postId, image }) {
  const [loading, setLoading] = useState(false)
  const fileInput = useRef(null)
  const handleImageUpload = async () => {
    if (fileInput.current && fileInput.current.files[0]) {
      setLoading(true)
      const imageFile = fileInput.current.files[0]
      let formData = new FormData()
      formData.append(
        'image',
        imageFile,
        imageFile.name
      )
      formData.append(
        'type',
        imageFile.type
      )
      const result = await uploadFeatureImageToServer(postId, formData)
      if (result) {
        setLoading(false)
        console.log(result);
      }
    }
  }

  return (
    <div className="flex items-center bg-grey-lighter">
      <label
        className={cs("px-4 py-2 bg-white rounded-lg shadow-lg border border-blue cursor-pointer", loading ? "bg-primary text-white cursor-not-allowed" : "hover:bg-primary hover:text-white")}
      >
        {loading ? (
          <ButtonLoadingIcon className="w-5 h-5" />
        ) : (
            <UploadFileIcon className="w-5 h-5" />
          )}
        <input
          type="file"
          ref={fileInput}
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  )
}