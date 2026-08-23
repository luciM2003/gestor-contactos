/** Placeholder animado que ocupa el lugar de una fila mientras carga la lista. */
export function ContactSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <ul className="divide-y divide-line" aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <li key={index} className="flex items-center gap-4 px-4 py-4 sm:px-6">
          <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-line" />
          <div className="flex-1 space-y-2">
            <div
              className="h-3.5 animate-pulse rounded bg-line"
              style={{ width: `${45 - index * 4}%` }}
            />
            <div
              className="h-3 animate-pulse rounded bg-line/70"
              style={{ width: `${65 - index * 5}%` }}
            />
          </div>
          <div className="hidden h-6 w-24 animate-pulse rounded-full bg-line sm:block" />
        </li>
      ))}
    </ul>
  );
}
