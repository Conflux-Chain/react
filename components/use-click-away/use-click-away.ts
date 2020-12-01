import { MutableRefObject, useEffect } from 'react'

type RefObject = MutableRefObject<HTMLElement | null>

const useClickAway = (refs: RefObject | Array<RefObject>, handler: (event: Event) => void) => {
  useEffect(() => {
    const callback = (event: Event) => {
      let refsArray = Array.isArray(refs) ? refs : [refs]
      let isAway = true
      while (refsArray.length) {
        const el = refsArray[0].current
        if (!event || !el || el.contains((event as any).target)) {
          isAway = false
          refsArray = []
        }
        refsArray.shift()
      }
      if (isAway) {
        handler(event)
      }
    }

    document.addEventListener('click', callback)
    return () => document.removeEventListener('click', callback)
  }, [refs, handler])
}

export default useClickAway
