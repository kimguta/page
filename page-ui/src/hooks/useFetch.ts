import { useEffect, useState } from 'react'

export function useFetch<T>(loader: () => Promise<T> | T, dependencies: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    Promise.resolve(loader())
      .then((result) => {
        if (mounted) {
          setData(result)
        }
      })
      .catch((reason: unknown) => {
        if (mounted) {
          setError(reason instanceof Error ? reason.message : 'Failed to load data')
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, dependencies)

  return { data, loading, error }
}
