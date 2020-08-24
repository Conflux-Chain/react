import { useRef, useState, useCallback } from 'react'
//https://raw.githubusercontent.com/react-component/util/master/src/hooks/useMergedState.ts
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

  //controlled take priority of uncontrolled
  let calcualteValue = value !== undefined ? value : innerValue
  if (postState) {
    calcualteValue = postState(calcualteValue)
  }

  //value inside setValue should be updated
  const mergedValue = useRef(calcualteValue)
  mergedValue.current = calcualteValue

  //do not change the identity of setValue
  const setValue = useCallback((newValue: T) => {
    if (!value) {
      console.log('setValue', newValue)
      setInnerValue(newValue)
    }
    if (mergedValue.current !== newValue && onChange) {
      onChange(newValue, mergedValue.current)
    }
  }, [])

  // console.log('mergedValue.current', mergedValue.current)

  return [mergedValue.current, setValue]
}
