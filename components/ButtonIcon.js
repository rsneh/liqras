import cs from 'classnames'
import LoadingIcon from 'components/LoadingIcon'

export default function ButtonIcon({ className, to, icon, type = 'button', loading = false }) {
  return (
    <button
      href={to}
      type={type}
      disabled={loading}
      className={cs(
        "transition ease-in-out duration-150",
        "items-center justify-center inline-flex",
        "text-white text-base whitespace-nowrap",
        "border border-transparent rounded",
        "bg-primary hover:bg-dark",
        { 'cursor-not-allowed': loading },
        className
      )}
    >
      {loading && <LoadingIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />}
      {icon}
    </button>
  )
}