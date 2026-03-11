// src/utils/dates.js
export function add(date, num, unit) {
  const result = new Date(date)
  if (unit === 'hours') result.setHours(result.getHours() + num)
  else if (unit === 'days') result.setDate(result.getDate() + num)
  return result
}

export function startOf(date, unit) {
  const d = new Date(date)
  if (unit === 'day') {
    d.setHours(0, 0, 0, 0)
  }
  return d
}

export function endOf(date, unit) {
  const d = new Date(date)
  if (unit === 'day') {
    d.setHours(23, 59, 59, 999)
  }
  return d
}
