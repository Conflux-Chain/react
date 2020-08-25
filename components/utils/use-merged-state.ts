import { useRef, useState, useCallback } from 'react'
// https://github.com/react-component/util/blob/4045d568885d65a5491ab22347682f5e31da31dc/src/hooks/useMergedState.ts
export default function useControlledState<T>(
  defaultValue: T,
  option?: {
    value?: T
    onChange?: (value: T, prevValue: T) => void
    postState?: (value: T) => T
  },
): [T, (value: T) => void] {
  const { value, onChange, postState } = option || {}
  const [innerValue, setInnerValue] = useState<T>(value !== undefined ? value : defaultValue)

  // controlled take priority of uncontrolled
  let calcualteValue = value !== undefined ? value : innerValue
  if (postState) {
    calcualteValue = postState(calcualteValue)
  }

  // value inside setValue should be updated
  const mergedValue = useRef(calcualteValue)
  mergedValue.current = calcualteValue

  // do not change the identity of setValue
  const setValue = useCallback((newValue: T) => {
    if (!value) {
      console.log('setValue', newValue)
      setInnerValue(newValue)
    }
    if (mergedValue.current !== newValue && onChange) {
      onChange(newValue, mergedValue.current)
    }
  }, [])

  return [mergedValue.current, setValue]
}
