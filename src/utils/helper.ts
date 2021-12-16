import { transform, isObject, isEqual } from 'lodash'

export const objDiff = (object, base) => {
  function changes(object, base) {
    return transform(object, (result: any, value, key) => {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value
      }
    })
  }
  return changes(object, base)
}
