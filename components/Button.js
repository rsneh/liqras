import cs from 'classnames'

export default function Button({ className, to, label }) {
  return (
    <a
      href={to}
      className={cs("items-center justify-center text-white text-base whitespace-nowrap inline-flex border border-transparent rounded bg-primary hover:bg-new-york-pink", className)}
    >
      {label}
    </a>
  )
}