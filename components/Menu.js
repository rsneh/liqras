import { useRef } from 'react'
import cs from 'classnames'
import { Transition } from '@headlessui/react'
import useOnClickOutside from 'components/hooks/useOnClickOutside'

export default function Menu({ children, isOpen, setIsOpen }) {
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <Transition
      show={isOpen}
      enter="duration-150 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100"
      leaveTo="opacity-0 scale-95"
      className={cs("transition transform z-50")}
    >
      <div
        ref={ref}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
      >
        {children}
      </div>
    </Transition>
  )
}