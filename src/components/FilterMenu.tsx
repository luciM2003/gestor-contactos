import { useEffect, useRef, useState } from "react";
import type { Department } from "../types/contact";
import { DEPARTMENTS, departmentStyles } from "../lib/departments";
import { FilterIcon } from "./icons";

type Props = {
  selected: Department[];
  onToggle: (department: Department) => void;
  onClear: () => void;
  counts: Record<Department, number>;
};

/** Ícono de embudo dentro de la barra de búsqueda que despliega los filtros de departamento. */
export function FilterMenu({ selected, onToggle, onClear, counts }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hasSelection = selected.length > 0;

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative flex shrink-0 items-center">
      <span className="h-6 w-px bg-line" aria-hidden="true" />

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Filtrar por departamento"
        className={`relative ml-2 mr-1 rounded-lg p-1.5 transition-all duration-150 active:scale-90 ${
          hasSelection ? "text-ink" : "text-muted hover:text-ink"
        }`}
      >
        <FilterIcon
          className={`h-5 w-5 transition-transform duration-200 ${
            open ? "rotate-[8deg] scale-110" : ""
          }`}
        />
        {hasSelection && (
          <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-ink ring-2 ring-white motion-safe:animate-check-pop" />
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="animate-pop absolute right-0 top-full z-10 mt-2 w-56 rounded-xl border border-line bg-white p-1.5 shadow-lg"
        >
          <button
            type="button"
            onClick={onClear}
            aria-pressed={selected.length === 0}
            className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 active:scale-[0.97] ${
              selected.length === 0
                ? "bg-ink text-white"
                : "text-ink hover:bg-paper"
            }`}
          >
            Todos
          </button>

          {DEPARTMENTS.map((department) => {
            const isOn = selected.includes(department);
            const style = departmentStyles[department];

            return (
              <button
                key={department}
                type="button"
                onClick={() => onToggle(department)}
                aria-pressed={isOn}
                className={`mt-0.5 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 active:scale-[0.97] ${
                  isOn ? style.chipOn : "text-ink hover:bg-paper"
                }`}
              >
                {!isOn && <span className={`h-2 w-2 rounded-full ${style.dot}`} />}
                <span className="flex-1 text-left">{department}</span>
                <span
                  className={`font-mono text-xs ${
                    isOn ? "text-white/80" : "text-muted"
                  }`}
                >
                  {counts[department]}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
