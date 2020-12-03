import cs from 'classnames'
import TooltipDownArrowIcon from 'assets/tooltip-down-arrow-icon.svg'
import styles from './Tooltip.module.scss'

export default function Tooltip({ className, label, onHover }) {
  return (
    <div className={cs(styles.tooltipContainer, className, "mx-2", "transition-all duration-1000 ease-in-out", onHover ? 'opacity-100' : 'opacity-0')}>
      <div className="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full">
        {label}
        <TooltipDownArrowIcon className="absolute text-black h-2 w-full left-0 top-full" />
      </div>
    </div>
  )
}