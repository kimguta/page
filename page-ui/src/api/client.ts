export function delay<T>(value: T, ms = 180) {
  return new Promise<T>((resolve) => {
    window.setTimeout(() => resolve(value), ms)
  })
}
