import { useRef, useState } from 'react'
import cs from 'classnames'
import styles from './Input.module.scss'

export default function Input({
  id,
  label,
  onChange,
  type = 'text',
  helpText = '',
  placeholder = '',
  defaultValue = ''
}) {
  const [filled, setFilled] = useState(false)
  const inputElem = useRef()
  const onKeyUpHandler = ({ target }) => target?.value !== '' ? setFilled(true) : setFilled(false)
  const onClickLabelHandler = () => inputElem.current.focus()
  const isFilled = filled || !!defaultValue
  return (
    <div className={styles['input-container']}>
      <div className="mb-4 relative">
        <input
          id={id}
          type={type}
          ref={inputElem}
          onChange={onChange}
          onKeyUp={onKeyUpHandler}
          placeholder={placeholder}
          value={defaultValue}
          className={cs(
            isFilled && styles.filled,
            `border border-gray-300 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus:border-primary focus:outline-none active:outline-none active:border-primary`
          )}
        />
        <label
          htmlFor={id}
          onClick={onClickLabelHandler}
          className="absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-gray-400 text-base mt-2 cursor-text"
        >{label}</label>
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  )
}