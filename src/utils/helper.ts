import { IMember } from 'interfaces/auth.interface'
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

export const generateTreeData = (members: IMember[]) => {
  return members.map(e => ({
    id: '' + e.id,
    rels: {
      father: e.father,
      mother: e.mother,
      spouses: e.spouses,
      children: e.children
    },
    data: {
      first_name: e.first_name,
      last_name: e.last_name,
      date_of_birth: e.date_of_birth,
      avatar: e.avatar,
      gender: e.gender
    }
  }))
}
