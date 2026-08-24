import { useEffect, useState } from "react";
import type { Contact } from "../types/contact";
import { departmentStyles } from "../lib/departments";
import { initial } from "../lib/text";
import { TrashIcon, AlertIcon } from "./icons";

type Props = {
  contact: Contact;
  index: number;
  onRemove: (id: string) => void;
};

type Stage = "idle" | "confirm" | "leaving";

/**
 * El borrado es de dos pasos: tocar la papelera pinta la fila de rojo y
 * pregunta; según la respuesta la fila vuelve a su estado normal (cancelar)
 * o colapsa hasta desaparecer (confirmar), usando el truco de grid-rows
 * para animar una altura que no se conoce de antemano.
 */
export function ContactRow({ contact, index, onRemove }: Props) {
  const style = departmentStyles[contact.department];
  const [stage, setStage] = useState<Stage>("idle");
  const isConfirming = stage === "confirm";
  const isLeaving = stage === "leaving";

  useEffect(() => {
    if (stage !== "confirm") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStage("idle");
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [stage]);

  return (
    <li
      className={`group grid transition-[grid-template-rows] duration-300 ease-in-out motion-safe:animate-rise ${
        isLeaving ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
      }`}
      style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
      onTransitionEnd={(event) => {
        if (event.propertyName === "grid-template-rows" && isLeaving) {
          onRemove(contact.id);
        }
      }}
    >
      <div className="overflow-hidden">
        <div
          className={`relative flex items-center gap-4 px-4 py-4 transition-[background-color,opacity] duration-300 sm:px-6 ${
            isConfirming || isLeaving
              ? "bg-danger/10"
              : "hover:bg-paper/60"
          } ${isLeaving ? "opacity-0" : "opacity-100"}`}
        >
          <div
            className={`flex flex-1 items-center gap-4 transition-opacity duration-150 ${
              isConfirming ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold ${style.tile}`}
            >
              {initial(contact.name)}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[17px] font-bold leading-tight text-ink">
                {contact.name}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-muted">
                <a
                  href={`mailto:${contact.email}`}
                  className="truncate underline-offset-2 hover:text-ink hover:underline"
                >
                  {contact.email}
                </a>
                {contact.phone && (
                  <>
                    <span aria-hidden="true" className="text-line">
                      |
                    </span>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="font-mono text-[13px] underline-offset-2 hover:text-ink hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </>
                )}
              </div>
            </div>

            <span
              className={`hidden shrink-0 rounded-full px-3 py-1 text-xs font-semibold sm:block ${style.tag}`}
            >
              {contact.department}
            </span>

            <button
              type="button"
              onClick={() => setStage("confirm")}
              aria-label={`Eliminar a ${contact.name}`}
              className="shrink-0 rounded-lg p-2 text-muted opacity-100 transition-all duration-150 hover:bg-danger/10 hover:text-danger active:scale-90 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
            >
              <TrashIcon className="h-[18px] w-[18px]" />
            </button>
          </div>

          <div
            className={`absolute inset-0 flex items-center justify-between gap-3 px-4 transition-opacity duration-150 sm:px-6 ${
              isConfirming ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-hidden={!isConfirming}
          >
            <p className="flex min-w-0 items-center gap-2 text-[15px] font-semibold text-danger">
              <AlertIcon className="h-[18px] w-[18px] shrink-0" />
              <span className="truncate">¿Eliminar a {contact.name}?</span>
            </p>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setStage("idle")}
                tabIndex={isConfirming ? 0 : -1}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-ink transition-all duration-150 hover:bg-white active:scale-95"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setStage("leaving")}
                tabIndex={isConfirming ? 0 : -1}
                className="rounded-lg bg-danger px-3 py-1.5 text-sm font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-95"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
