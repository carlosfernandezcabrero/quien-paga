import { useEffect, useRef, useState } from 'react'

export default function WithClickOutside(WrappedComponent) {
  const Component = () => {
    const [open, setOpen] = useState(false)

    const ref = useRef()

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (!ref.current.contains(event.target)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])

    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
  }

  return Component
}
