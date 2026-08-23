import type { Contact } from "../types/contact";
import { departmentStyles } from "../lib/departments";
import { initial } from "../lib/text";
import { TrashIcon } from "./icons";

type Props = {
  contact: Contact;
  index: number;
  onRemove: (id: string) => void;
};

export function ContactRow({ contact, index, onRemove }: Props) {
  const style = departmentStyles[contact.department];

  return (
    <li
      className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-paper/60 sm:px-6 motion-safe:animate-rise"
      style={{ animationDelay: `${Math.min(index, 8) * 35}ms` }}
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
        onClick={() => onRemove(contact.id)}
        aria-label={`Eliminar a ${contact.name}`}
        className="shrink-0 rounded-lg p-2 text-muted opacity-100 transition-colors hover:bg-danger/10 hover:text-danger focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
      >
        <TrashIcon className="h-[18px] w-[18px]" />
      </button>
    </li>
  );
}
