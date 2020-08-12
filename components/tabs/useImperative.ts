import { useRef, RefObject } from 'react'
import { Handles } from './tabs-context'

export default function useImperative() {
  const ref: RefObject<Handles> = useRef(null)
  return {
    currentTab(v?: string) {
      return ref.current?.currentTab(v)
    },
    ref,
  }
}
