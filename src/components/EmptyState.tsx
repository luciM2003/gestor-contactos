import { PlusIcon, SearchIcon } from "./icons";

type Props =
  | { variant: "empty"; onAdd: () => void }
  | { variant: "no-results"; onClear: () => void };

/**
 * Dos vacíos distintos: la agenda sin contactos y la búsqueda sin coincidencias.
 * Cada uno propone la acción que corresponde.
 */
export function EmptyState(props: Props) {
  const isEmpty = props.variant === "empty";

  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-paper text-muted">
        {isEmpty ? (
          <PlusIcon className="h-6 w-6" />
        ) : (
          <SearchIcon className="h-6 w-6" />
        )}
      </div>

      <h2 className="font-display text-xl font-bold text-ink">
        {isEmpty ? "La agenda está vacía" : "Ningún contacto coincide"}
      </h2>

      <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
        {isEmpty
          ? "Agregá el primer contacto y va a aparecer al principio de la lista."
          : "Probá con otro nombre o sacá algún filtro de departamento."}
      </p>

      {isEmpty ? (
        <button
          type="button"
          onClick={props.onAdd}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <PlusIcon className="h-4 w-4" />
          Agregar contacto
        </button>
      ) : (
        <button
          type="button"
          onClick={props.onClear}
          className="mt-6 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
