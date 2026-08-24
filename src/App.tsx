import { useMemo, useState } from "react";
import type { Department } from "./types/contact";
import { DEPARTMENTS } from "./lib/departments";
import { normalize } from "./lib/text";
import { useContacts } from "./hooks/useContacts";
import { SearchBar } from "./components/SearchBar";
import { ContactRow } from "./components/ContactRow";
import { ContactSkeleton } from "./components/ContactSkeleton";
import { EmptyState } from "./components/EmptyState";
import { Modal } from "./components/Modal";
import { ContactForm } from "./components/ContactForm";
import { PlusIcon } from "./components/icons";

export default function App() {
  const { contacts, isLoading, addContact, removeContact } = useContacts();

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Department[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);

  const toggleDepartment = (department: Department) => {
    setSelected((current) =>
      current.includes(department)
        ? current.filter((item) => item !== department)
        : [...current, department]
    );
  };

  const clearFilters = () => {
    setSelected([]);
    setQuery("");
  };

  /** Los dos filtros se aplican juntos: nombre y departamento. */
  const filtered = useMemo(() => {
    const term = normalize(query);

    return contacts.filter((contact) => {
      const matchesName = term === "" || normalize(contact.name).includes(term);
      const matchesDepartment =
        selected.length === 0 || selected.includes(contact.department);
      return matchesName && matchesDepartment;
    });
  }, [contacts, query, selected]);

  /** Cuántos contactos hay por departamento, para mostrarlo dentro de cada chip. */
  const counts = useMemo(() => {
    const base = Object.fromEntries(
      DEPARTMENTS.map((department) => [department, 0])
    ) as Record<Department, number>;

    for (const contact of contacts) base[contact.department] += 1;
    return base;
  }, [contacts]);

  const hasFilters = query.trim() !== "" || selected.length > 0;
  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Equipo
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-none tracking-tight text-ink sm:text-5xl">
              Directorio
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
              Buscá a alguien por nombre, filtrá por departamento y mantené la
              lista al día.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5 active:scale-95"
          >
            <PlusIcon className="h-4 w-4" />
            Agregar contacto
          </button>
        </header>

        <section className="mt-8" aria-label="Filtros">
          <SearchBar
            value={query}
            onChange={setQuery}
            selectedDepartments={selected}
            onToggleDepartment={toggleDepartment}
            onClearDepartments={() => setSelected([])}
            counts={counts}
          />
        </section>

        <main className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
            <p
              aria-live="polite"
              className="font-mono text-[13px] tracking-tight text-muted"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span
                    className="skeleton h-3.5 w-28 rounded"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Cargando contactos…</span>
                </span>
              ) : (
                <>
                  <span className="font-medium text-ink">
                    {pad(filtered.length)}
                  </span>
                  <span className="mx-1.5 text-line">/</span>
                  {pad(contacts.length)}{" "}
                  {hasFilters ? "resultados" : "contactos"}
                </>
              )}
            </p>

            {hasFilters && !isLoading && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-[13px] font-semibold text-muted underline-offset-4 transition-all duration-150 hover:text-ink hover:underline active:scale-95 motion-safe:animate-fade"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {isLoading ? (
            <ContactSkeleton />
          ) : contacts.length === 0 ? (
            <EmptyState variant="empty" onAdd={() => setFormOpen(true)} />
          ) : filtered.length === 0 ? (
            <EmptyState variant="no-results" onClear={clearFilters} />
          ) : (
            <ul className="divide-y divide-line">
              {filtered.map((contact, index) => (
                <ContactRow
                  key={contact.id}
                  contact={contact}
                  index={index}
                  onRemove={removeContact}
                />
              ))}
            </ul>
          )}
        </main>
      </div>

      <Modal
        open={isFormOpen}
        title="Nuevo contacto"
        description="Los campos con * son obligatorios."
        onClose={() => setFormOpen(false)}
      >
        <ContactForm
          existingEmails={contacts.map((contact) => contact.email.toLowerCase())}
          onSubmit={(draft) => addContact(draft)}
          onSaved={() => setFormOpen(false)}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>
    </div>
  );
}
