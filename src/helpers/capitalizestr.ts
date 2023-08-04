export const capitalize = (str: string) => {
  return str.replace(/\w\S*/g, (w) => w.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()))
}

export const setColor = (status:string) => {
    if (status === "En_proceso") return "bg-yellow-100 text-yellow-800";
    if (status === "Recibido") return "bg-blue-200 text-blue-800";
    if (status === "Completado") return "bg-success text-green-900";
    if (status === "Cancelada") return "bg-red-100 text-red-800";
    if (status === null) return "bg-red-100 text-red-800";
  };
