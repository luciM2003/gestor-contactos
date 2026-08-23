import type { Department } from "../types/contact";
import { DEPARTMENTS, departmentStyles } from "../lib/departments";

type Props = {
  selected: Department[];
  onToggle: (department: Department) => void;
  onClear: () => void;
  counts: Record<Department, number>;
};

export function DepartmentChips({ selected, onToggle, onClear, counts }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onClear}
        aria-pressed={selected.length === 0}
        className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
          selected.length === 0
            ? "border-ink bg-ink text-white"
            : "border-line bg-white text-muted hover:border-ink hover:text-ink"
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
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isOn
                ? style.chipOn
                : "border-line bg-white text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {!isOn && <span className={`h-2 w-2 rounded-full ${style.dot}`} />}
            {department}
            <span className="font-mono text-xs opacity-70">
              {counts[department]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
