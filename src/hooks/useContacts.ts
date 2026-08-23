import { useCallback, useEffect, useState } from "react";
import type { Contact, ContactDraft } from "../types/contact";
import { uuid } from "../lib/uuid";
import initialContacts from "../data/data.json";

/** Milisegundos de carga simulada para que se vea el skeleton. */
const LOADING_DELAY = 900;

/**
 * Estado de la lista de contactos.
 * La carga inicial se hace desde data.json con un retardo simulado,
 * como si viniera de una API.
 */
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const timer = window.setTimeout(() => {
      if (!active) return;
      setContacts(initialContacts as Contact[]);
      setIsLoading(false);
    }, LOADING_DELAY);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  const addContact = useCallback((draft: ContactDraft) => {
    const contact: Contact = { id: uuid(), ...draft };
    setContacts((current) => [contact, ...current]);
    return contact;
  }, []);

  const removeContact = useCallback((id: string) => {
    setContacts((current) => current.filter((contact) => contact.id !== id));
  }, []);

  return { contacts, isLoading, addContact, removeContact };
}
