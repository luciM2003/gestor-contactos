import type { Department } from "../types/contact";
import { SearchIcon, CloseIcon } from "./icons";
import { FilterMenu } from "./FilterMenu";

type Props = {
  value: string;
  onChange: (value: string) => void;
  selectedDepartments: Department[];
  onToggleDepartment: (department: Department) => void;
  onClearDepartments: () => void;
  counts: Record<Department, number>;
};

export function SearchBar({
  value,
  onChange,
  selectedDepartments,
  onToggleDepartment,
  onClearDepartments,
  counts,
}: Props) {
  return (
    <div className="flex items-center rounded-xl border border-line bg-white pr-2 transition-shadow duration-200 focus-within:border-ink focus-within:shadow-[0_0_0_3px_rgba(22,24,29,0.06)]">
      <div className="relative min-w-0 flex-1">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar por nombre"
          aria-label="Buscar contactos por nombre"
          className="w-full bg-transparent py-3 pl-12 pr-9 text-[15px] text-ink placeholder:text-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Borrar la búsqueda"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted transition-all duration-150 hover:bg-paper hover:text-ink active:scale-90 motion-safe:animate-pop"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      <FilterMenu
        selected={selectedDepartments}
        onToggle={onToggleDepartment}
        onClear={onClearDepartments}
        counts={counts}
      />
    </div>
  );
}
