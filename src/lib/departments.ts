import type { Department } from "../types/contact";

export const DEPARTMENTS: Department[] = [
  "Ventas",
  "Desarrollo",
  "Marketing",
  "Soporte",
];

type DepartmentStyle = {
  /** Cuadrado con la inicial del contacto. */
  tile: string;
  /** Etiqueta del departamento dentro de la fila. */
  tag: string;
  /** Chip de filtro activo. */
  chipOn: string;
  /** Punto de color del chip inactivo. */
  dot: string;
};

/**
 * Cada departamento tiene un color propio y siempre el mismo:
 * el color es información, no decoración.
 * Las clases se escriben completas porque Tailwind analiza el código
 * como texto y no puede resolver nombres armados en tiempo de ejecución.
 */
export const departmentStyles: Record<Department, DepartmentStyle> = {
  Ventas: {
    tile: "bg-[#FDF0E3] text-[#9A4A0B]",
    tag: "bg-[#FDF0E3] text-[#9A4A0B]",
    chipOn: "bg-[#9A4A0B] text-white border-[#9A4A0B]",
    dot: "bg-[#9A4A0B]",
  },
  Desarrollo: {
    tile: "bg-[#E9E9FB] text-[#3B34A8]",
    tag: "bg-[#E9E9FB] text-[#3B34A8]",
    chipOn: "bg-[#3B34A8] text-white border-[#3B34A8]",
    dot: "bg-[#3B34A8]",
  },
  Marketing: {
    tile: "bg-[#FCE7F0] text-[#A3175A]",
    tag: "bg-[#FCE7F0] text-[#A3175A]",
    chipOn: "bg-[#A3175A] text-white border-[#A3175A]",
    dot: "bg-[#A3175A]",
  },
  Soporte: {
    tile: "bg-[#DFF1EE] text-[#0B6459]",
    tag: "bg-[#DFF1EE] text-[#0B6459]",
    chipOn: "bg-[#0B6459] text-white border-[#0B6459]",
    dot: "bg-[#0B6459]",
  },
};
