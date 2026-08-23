/** Pasa a minúsculas y saca tildes para que "Martín" coincida con "martin". */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Inicial que se muestra en el cuadrado de color de cada fila. */
export function initial(name: string): string {
  return name.trim().charAt(0).toUpperCase() || "?";
}
