import { useState, useRef } from 'react'
import { submitSubscribeForm } from 'actions/form'
import { InputSolid } from 'components/inputs/Input'
import SavingLoader from 'components/SavingLoader'
import cs from 'classnames'

export default function SubscribeFormSection() {
  const emailInputRef = useRef()
  const [response, setResponse] = useState({})
  const [loading, setIsLoading] = useState(false)
  const { success, message } = response

  const onSubmitSubscribeHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const result = await submitSubscribeForm({ email: emailInputRef?.current?.value })
    setIsLoading(false)
    const { error, message } = result
    setResponse({
      success: !error,
      message: error ? error : message
    })
    if (!error) emailInputRef.current.value = ''
  }
  return (
    <div className="bg-gradient-to-b bg-primary from-white py-12">
      <div className="p-10 py-20 flex flex-col flex-wrap justify-center content-center">
        <div className="m-0 p-0 text-3xl font-bold text-dark antialiased text-center">Subscribe to our Newsletter</div>
        <div className="m-0 p-0 text-xl text-dark antialiased text-center">Latest news, posts and updates montly delevered to your inbox.</div>
        <div className="mt-4">
          <div className="flex items-center">
            <form className="flex-1 flex items-center" onSubmit={onSubmitSubscribeHandler} method="post">
              <label htmlFor="subscribe-email" className="sr-only">Email</label>
              <InputSolid
                innerRef={emailInputRef}
                required
                type="email"
                name="email"
                id="subscribe-email"
                className="flex-grow-1"
                placeholder="your@email.com"
              />
              {loading ? (
                <div className="-ml-24">
                  <SavingLoader showLabel={false} />
                </div>
              ) : (
                  <button type="submit" className="bg-silver border border-gray-400 text-dark px-5 py-2 rounded shadow -ml-32">Subscribe</button>
                )}
            </form>
          </div>
          {message && (
            <div className="flex justify-center p-2">
              <div className={cs("inline-flex items-center bg-white leading-none rounded-full p-2 shadow text-sm", success ? 'text-green-500' : 'text-red-500')}>
                <span className={cs("inline-flex text-white rounded-full h-6 px-3 font-bold justify-center items-center", success ? 'bg-green-500' : 'bg-red-500')}>Success!</span>
                <span className="inline-flex font-medium px-2">{message}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}