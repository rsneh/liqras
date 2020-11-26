import cs from 'classnames'

export default function Button({ className, to, label, type = 'button' }) {
  return (
    <button
      href={to}
      type={type}
      className={cs("items-center justify-center text-white text-base whitespace-nowrap inline-flex border border-transparent rounded bg-primary hover:bg-dark", className)}
    >
      {label}
    </button>
  )
}