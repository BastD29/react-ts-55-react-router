import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { ContactType } from "../models/Contact";

export async function getContacts(query?: string): Promise<ContactType[]> {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = await localforage.getItem<ContactType[]>("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  // TypeScript might require an explicit assertion here if sortBy does not provide proper typings
  return contacts.sort(sortBy("last", "createdAt")) as ContactType[];
}

export async function createContact(): Promise<ContactType> {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact: ContactType = { id, createdAt: Date.now() };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string): Promise<ContactType | null> {
  await fakeNetwork(`contact:${id}`);
  let contacts = await localforage.getItem<ContactType[]>("contacts");
  // Immediately default to an empty array if null
  if (!contacts) contacts = [];
  let contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
}

export async function updateContact(
  id: string,
  updates: Partial<ContactType>
): Promise<ContactType> {
  await fakeNetwork();
  let contacts = await localforage.getItem<ContactType[]>("contacts");
  // Immediately default to an empty array if null
  if (!contacts) contacts = [];
  let contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error(`No contact found for ${id}`);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: string): Promise<boolean> {
  let contacts = await localforage.getItem<ContactType[]>("contacts");
  // Immediately default to an empty array if null
  if (!contacts) contacts = [];
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts: ContactType[]): Promise<ContactType[]> {
  return localforage.setItem("contacts", contacts);
}

let fakeCache: Record<string, boolean> = {};

async function fakeNetwork(key?: string): Promise<void> {
  // Check if 'key' is undefined or empty and return immediately if it is
  if (key === undefined || key === "") {
    return;
  }

  // Reset the cache if no specific key is provided
  if (!key) {
    fakeCache = {};
    return;
  }

  // Proceed with the original logic now that 'key' is guaranteed to be non-undefined
  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 800);
  });
}
