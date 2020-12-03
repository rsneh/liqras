import { useState } from 'react';
import cs from 'classnames'
import Tooltip from 'components/Tooltip';
import styles from './styles.module.scss'

export default function Switch({ label, checked, setChecked, showTooltip = false }) {
  const [onHover, setOnHover] = useState(false)
  return (
    <div className="mb-4">
      <div
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        className={cs(styles.toggleSwitch, "relative inline-block w-10 mx-2 align-middle select-none transition duration-200 ease-in")}
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
          id="input-switch"
          className={cs(styles["input-checkbox"], "input-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none", checked && styles["checked"])}
          onClick={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="input-switch" className={cs(styles["toggle-label"], "block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer")}></label>
      </div>
      {!showTooltip && (
        <label htmlFor="input-switch" className="text-xs">{label}</label>
      )}
    </div>
  )
}