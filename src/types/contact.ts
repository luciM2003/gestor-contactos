export type Department = "Ventas" | "Desarrollo" | "Marketing" | "Soporte";

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: Department;
};

/** Datos que entrega el formulario, antes de asignarle un id. */
export type ContactDraft = Omit<Contact, "id">;
