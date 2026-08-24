/** Placeholder animado que ocupa el lugar de una fila mientras carga la lista. */
export function ContactSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <ul className="divide-y divide-line motion-safe:animate-fade" aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        <li
          key={index}
          className="flex items-center gap-4 px-4 py-4 motion-safe:animate-rise sm:px-6"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <div className="skeleton h-11 w-11 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <div
              className="skeleton h-3.5 rounded"
              style={{ width: `${45 - index * 4}%` }}
            />
            <div
              className="skeleton h-3 rounded"
              style={{ width: `${65 - index * 5}%` }}
            />
          </div>
          <div className="skeleton hidden h-6 w-24 rounded-full sm:block" />
        </li>
      ))}
    </ul>
  );
}
