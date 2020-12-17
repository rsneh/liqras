import cs from 'classnames'

export function ButtonLoadingIcon({ className }) {
  return (
    <svg className={cs(className, "animate-spin")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}

export function AnchorButton({ label, onClick, className, colorClass = "text-primary" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cs(
        className,
        colorClass,
        "background-transparent font-bold text-xs outline-none focus:outline-none"
      )}
      style={{ transition: "all .15s ease" }}
    >
      {label}
    </button>
  )
}
export function Button({
  className,
  label,
  onClick,
  type = 'button',
  loading = false,
  colorClass = "text-white bg-primary hover:bg-dark"
}) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={cs(
        "transition ease-in-out duration-150",
        "items-center justify-center inline-flex",
        "text-base whitespace-nowrap",
        "border border-transparent rounded",
        { 'cursor-not-allowed': loading },
        colorClass,
        className
      )}
    >
      {loading && <ButtonLoadingIcon className="-ml-1 mr-3 h-5 w-5" />}
      {label}
    </button>
  )
}