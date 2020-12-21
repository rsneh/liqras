import Image from 'next/image'
import { useState } from 'react'
import Alert from 'components/Alert'
import { useUser } from 'utils/user'
import { Button } from 'components/Buttons'
import { InputSolid } from './inputs/Input'

export default function ProfileAuthorForm({ author }) {
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [{ success, message }, setResponse] = useState({})
  const { user } = useUser()

  const closeAlert = () => {
    setShowAlert(false)
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const { elements } = e?.target
    if (elements) {

      const values = Object.values(elements).reduce((vals, element) => {
        if (element.type.toLowerCase() === 'submit') return vals
        vals[element.name] = element.value
        return vals
      }, {})

      setLoading(true)
      const res = await fetch('/api/profile', {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })

      const { error } = await res.json()
      setLoading(false)
      setShowAlert(true)
      if (error) {
        setResponse({
          success: false,
          message: error
        })
      }
      else {
        setResponse({
          success: true
        })
      }
    }
  }

  return (
    <>
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Author</h3>
          <p className="mt-1 text-sm text-gray-600">This information will be displayed publicly with your blog and posts. So be careful what you share.</p>
        </div>
      </div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <Alert
          show={showAlert}
          dismissible={true}
          variant={success ? 'success' : 'error'}
          onClose={closeAlert}
          label={success ? 'Success!' : 'Error.'}
          message={success ? 'Your profile has been successfully saved.' : message}
        />
        <form action="#" method="POST" onSubmit={submitForm}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-2 flex items-center cursor-not-allowed">
                  {user?.picture && (
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        width={48}
                        height={48}
                        src={`${user.picture}?w=48&h=48`}
                      />
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">Headline</label>
                <div className="mt-1">
                  <InputSolid
                    type="text"
                    name="headline"
                    id="author-headline"
                    className="flex-grow-1"
                    bgColorClass="bg-white"
                    defaultValue={author?.headline}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  It will be showing next to your name. It can be your title or anything you like.
                </p>
              </div>
              <div>
                <label htmlFor="author-website" className="block text-sm font-medium text-gray-700">Website</label>
                <div className="mt-1">
                  <InputSolid
                    type="url"
                    name="website"
                    id="author-website"
                    bgColorClass="bg-white"
                    className="flex-grow-1"
                    defaultValue={author?.website}
                    placeholder="https://www.website.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">About</label>
                <div className="mt-1">
                  <textarea
                    rows="3"
                    name="about"
                    id="author-about"
                    defaultValue={author?.about}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description for your profile.
                </p>
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      <button className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Upload a file
                    </button>
                    or drag and drop
                  </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                  </p>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <Button
                type="submit"
                label="Save"
                loading={loading}
                className="ml-8 px-4 py-2"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}