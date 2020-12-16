import styles from './SavingLoader.module.scss'

export default function SavingLoader() {
  return (
    <div className="flex flex-1 items-center px-5 py-2">
      <div className={styles['loader-dots']}>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full"></div>
      </div>
      <div className="text-gray-500 text-xs font-light text-center">
        Please wait...
      </div>
    </div>
  )
}