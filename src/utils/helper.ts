import { IGraphData, IMember } from 'interfaces/auth.interface'
import { transform, isObject, isEqual } from 'lodash'

import Male from 'assets/images/avatar-male.jpg'
import Female from 'assets/images/avatar-female.jpg'

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

export const getAge = (dateString: string) => {
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export const generateTreeData = (members: IMember[]): IGraphData[] => {
  return members
    ?.map(e => ({
      id: '' + e.id,
      main: e.main,
      rels: {
        father: e.father || '',
        mother: e.mother || '',
        spouses: e.spouses || [],
        children: e.children || []
      },
      data: {
        first_name: e.first_name || '',
        last_name: e.last_name || '',
        date_of_birth: e.date_of_birth || '',
        avatar:
          e?.avatar?.[0]?.image || ['Male', 'male'].includes(e.gender || 'male')
            ? Male
            : Female,
        gender: ['Male', 'male'].includes(e.gender || 'male') ? 'M' : 'F'
      }
    }))
    .sort((a, b) => (!(a.main !== b.main) ? 0 : a.main ? -1 : 1))
}
