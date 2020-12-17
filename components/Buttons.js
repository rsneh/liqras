import cs from 'classnames'
import LoadingIcon from 'components/LoadingIcon'

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
      {loading && <LoadingIcon className="-ml-1 mr-3 h-5 w-5" />}
      {label}
    </button>
  )
}