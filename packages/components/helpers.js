export const classnames = (blockClassName, modifierClasses) => {
  return [blockClassName, ...Object
    .entries(modifierClasses)
    .filter(([className, predicate]) => predicate)
    .map(([className]) => className)
    .toString()
  ].join(' ')
}