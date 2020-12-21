import cs from 'classnames'
import { useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'

function getVariantClass(variant) {
  const bgLevel = 500
  switch (variant) {
    case 'success':
      return `bg-green-${bgLevel}`
    case 'error':
    default:
      return `bg-red-${bgLevel}`
  }
}
export default function Alert({ show, variant, label, message, dismissible, onClose }) {
  const handleClose = useCallback((e) => {
    if (onClose) onClose(false, e)
  })

  const colorCss = getVariantClass(variant)
  return (
    <CSSTransition
      in={show}
      timeout={500}
      unmountOnExit
      classNames="fade"
    >
      <div className={cs("text-white px-6 py-4 border-0 rounded relative mb-4", colorCss)} role="alert">
        <span className="text-xl inline-block mr-5 align-middle">
          <i className="fas fa-bell" />
        </span>
        <span className="inline-block align-middle mr-8 font-medium">
          <span className="capitalize font-bold">{label}</span> {message}
        </span>
        {dismissible && (
          <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" onClick={handleClose}>
            <span>×</span>
          </button>
        )}
      </div>
    </CSSTransition>
  )
}