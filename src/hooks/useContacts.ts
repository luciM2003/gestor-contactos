import { useCallback, useEffect, useState } from "react";
import type { Contact, ContactDraft } from "../types/contact";
import { uuid } from "../lib/uuid";
import initialContacts from "../data/data.json";

/** Milisegundos de carga simulada para que se vea el skeleton. */
const LOADING_DELAY = 900;

/** Clave de localStorage donde vive la agenda completa. */
const STORAGE_KEY = "gestor-contactos:contacts";

/** Si ya hay una agenda guardada la usa; si no, siembra desde data.json. */
function loadContacts(): Contact[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Contact[];
  } catch {
    // localStorage bloqueado o con datos corruptos: se vuelve a sembrar.
  }
  return initialContacts as Contact[];
}

/**
 * Estado de la lista de contactos, persistido en localStorage.
 * La carga inicial simula un retardo de red, como si viniera de una API,
 * pero los datos y cada cambio (alta o baja) se guardan en el navegador.
 */
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const timer = window.setTimeout(() => {
      if (!active) return;
      setContacts(loadContacts());
      setIsLoading(false);
    }, LOADING_DELAY);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    } catch {
      // localStorage bloqueado (ej. modo privado): la sesión sigue en memoria.
    }
  }, [contacts, isLoading]);

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
