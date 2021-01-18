import { useRef, useState } from 'react'
import cs from 'classnames'
import styles from './Input.module.scss'

export function InputSolid({
  id,
  name,
  type = 'text',
  rounded = true,
  className = '',
  required = false,
  placeholder = '',
  bgColorClass = '',
  onChange = undefined,
  innerRef = undefined,
  defaultValue = undefined
}) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      ref={innerRef}
      required={required}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={cs("w-full shadow-inner focus:outline-none", bgColorClass, className, { 'rounded-md': rounded })}
    />
  )
}

export default function Input({
  id,
  label,
  name = '',
  type = 'text',
  helpText = '',
  placeholder = '',
  disabled = false,
  style = undefined,
  onChange = undefined,
  defaultValue = undefined
}) {
  const [filled, setFilled] = useState(false)
  const inputElem = useRef()
  const onKeyUpHandler = ({ target }) => target?.value !== '' ? setFilled(true) : setFilled(false)
  const onClickLabelHandler = () => inputElem.current.focus()
  const isFilled = filled || (!!defaultValue || !!placeholder)
  return (
    <div className={styles['input-container']}>
      <div className="mb-4 relative">
        <input
          id={id}
          name={name}
          type={type}
          ref={inputElem}
          disabled={disabled}
          onChange={onChange}
          onKeyUp={onKeyUpHandler}
          placeholder={placeholder}
          value={defaultValue}
          className={cs(
            isFilled && styles.filled,
            { 'opacity-50 cursor-not-allowed': disabled },
            `border border-gray-300 appearance-none rounded w-full px-3 py-3 pt-5 pb-2 focus:border-primary focus:outline-none active:outline-none active:border-primary`
          )}
          style={style}
        />
        <label
          htmlFor={id}
          onClick={onClickLabelHandler}
          className="absolute mb-0 -mt-2 pt-4 pl-3 leading-tighter text-base mt-2 cursor-text"
        >{label}</label>
      </div>
      {helpText && (
        <p className="mt-2 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  )
}