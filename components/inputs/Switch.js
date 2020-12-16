import { useState } from 'react';
import cs from 'classnames'
import Tooltip from 'components/Tooltip';
import styles from './styles.module.scss'

export default function Switch({ id, label, checked, setChecked, showTooltip = false }) {
  const [onHover, setOnHover] = useState(false)
  const handleonChange = (e) => setChecked(e.target.checked)
  return (
    <div className="mb-4">
      <div
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        className={cs(styles.toggleSwitch, "relative mr-2 inline-block w-10 align-middle select-none transition duration-200 ease-in")}
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
          checked={!!checked}
          onChange={handleonChange}
          className={cs(styles["input-checkbox"], "absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none", checked && styles["checked"])}
        />
        <label htmlFor={id} className={cs(styles["toggle-label"], "block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer")}></label>
      </div>
      {!showTooltip && (
        <label htmlFor={id} className="text-xs cursor-pointer">{label}</label>
      )}
    </div>
  )
}