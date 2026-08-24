import { useEffect, useId, useRef, type ReactNode } from "react";
import { CloseIcon } from "./icons";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Modal con cierre por Escape, por click en el fondo y bloqueo del scroll.
 * Al abrirse manda el foco al primer campo para poder completarlo de una.
 */
export function Modal({ open, title, description, onClose, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    const firstField = panelRef.current?.querySelector<HTMLElement>(
      "input, select, textarea"
    );
    firstField?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 backdrop-blur-[2px] motion-safe:animate-fade sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="relative w-full max-w-lg overflow-hidden rounded-t-2xl bg-white shadow-xl motion-safe:animate-pop sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            <h2
              id={titleId}
              className="font-display text-xl font-bold tracking-tight text-ink"
            >
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-1 text-sm text-muted">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="-mr-2 rounded-lg p-2 text-muted transition-all duration-150 hover:bg-paper hover:text-ink active:scale-90"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </header>

        {children}
      </div>
    </div>
  );
}
