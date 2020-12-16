import { useState } from 'react';
import cs from 'classnames'
import Tooltip from 'components/Tooltip';
import styles from './styles.module.scss'

export default function Switch({ id, label, checked, setChecked, disabled = false, showTooltip = false }) {
  const [onHover, setOnHover] = useState(false)
  const handleonChange = (e) => setChecked(e.target.checked)
  return (
    <div className="mb-4">
      <div
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        className={cs(styles.toggleSwitch, disabled ? 'cursor-not-allowed' : 'cursor-pointer', "relative inline-block w-10 align-middle select-none transition duration-200 ease-in")}
      >
        {showTooltip && (
          <Tooltip
            label={label}
            onHover={onHover}
            className="text-xs"
          />
        )}
        <input
          type="checkbox"
          name="toggle"
          id={id}
          disabled={!!disabled}
          checked={!!checked}
          onChange={handleonChange}
          className={cs(
            styles["input-checkbox"],
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            "absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none focus:outline-none",
            checked && styles["checked"])}
        />
        <label htmlFor={id} className={cs(styles["toggle-label"], disabled ? 'cursor-not-allowed' : 'cursor-pointer', "block overflow-hidden h-6 rounded-full bg-gray-300")}></label>
      </div>
      {
        !showTooltip && (
          <label htmlFor={id} className={cs("pl-2 text-xs", disabled ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer')}>{label}</label>
        )
      }
    </div >
  )
}