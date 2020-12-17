import styles from './SavingLoader.module.scss'

export default function SavingLoader({ showLabel = true }) {
  return (
    <>
      <div className={styles['loader-dots']}>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full"></div>
        <div className="absolute top-0 mt-1 w-3 h-3 rounded-full"></div>
      </div>
      {showLabel && (
        <div className="text-gray-500 text-xs font-light text-center">
          Please wait...
        </div>
      )}
    </>
  )
}