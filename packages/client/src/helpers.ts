export const compose = (...fns: Function[]) => {
  return fns.reduce((fns, fn) => (value: Function) => fns(fn(value)))
}

export const partial = (fn: Function, ...values: any[]) => {
  return fn.bind(null, ...values)
}
