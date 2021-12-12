import { useState, cloneElement } from 'react';

export default function Modal({
  children,
  button,
  primaryDialogButton = null,
  header = true,
  title = '',
  size = 'sm',
  footer = true
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {cloneElement(button, {
        onClick: (e) => setShowModal(prev => !prev)
      })}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className={`relative w-full my-6 mx-auto max-w-screen-${size}`}>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {header && (
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    {title && (
                      <h3 className="text-3xl font-semibold">
                        {title}
                      </h3>
                    )}
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                )}
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {children}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 bg-gray-50 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {primaryDialogButton && (
                    cloneElement(primaryDialogButton)
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}