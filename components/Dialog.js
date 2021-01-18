export default function Dialog({ open, size = 'md', onClose, children }) {
  if (!open) {
    return <></>
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-sans">
        <div className={`relative w-full my-6 bg-white rounded-lg shadow-lg mx-auto max-w-screen-${size}`}>
          <div className="border-0 relative flex flex-col w-full outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">{children}</div>
          </div>
          <div className="absolute top-0 right-0 p-4">
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => onClose()}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}