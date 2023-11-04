export const stringifyDate = (date: string) => {
  const timeStamp = Date.parse(date)
  const localeDate = new Date(timeStamp).toLocaleDateString(
    'es-CO', 
    { year: 'numeric', month: 'short', day: 'numeric' }
  )
  return localeDate
}