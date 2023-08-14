export const capitalize = (str: string = '') => {
  return str?.replace(/\w\S*/g, (w) => w.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()))
}

export const setColor = (status: string) => {
  if (status.toLocaleLowerCase() === 'recibido') return 'bg-info/20 text-info'
  if (status.toLocaleLowerCase() === 'revision') return 'bg-warning/20 text-warning'
  if (status.toLocaleLowerCase() === 'autorizacion') return 'bg-warning/20 text-warning '
  if (status.toLocaleLowerCase() === 'proceso') return 'bg-info/20 text-info'
  if (status.toLocaleLowerCase() === 'completado') return 'bg-success/20 text-success'
  if (status.toLocaleLowerCase() === 'entregado') return 'bg-success/20 text-success'
  if (status.toLocaleLowerCase() === 'cancelado') return 'bg-error/20 text-error'
}
