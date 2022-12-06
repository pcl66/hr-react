import { useEffect, useState } from "react"

export const useProvider= <T extends {}> (fetch: Function, params: any, trigger?:number) => {
  const [state, setState] = useState<T | null>(null)
  useEffect(() => {
    fetch(...params).then((res: T) => {
      console.log('use', res)
      setState(res)
    }).catch((err: any) => {
      setState(null)
    })
  }, [trigger])
  return state
}