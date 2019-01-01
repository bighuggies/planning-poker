export const compose = (...fns: Function[]) => {
  return fns.reduce((fns, fn) => (value: Function) => fns(fn(value)))
}
