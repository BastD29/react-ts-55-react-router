import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createContact, updateContact } from "./contact";

interface Contact {
  id: string;
}

async function rootAction(): Promise<{ contact: Contact }> {
  const contact = await createContact();
  return { contact };
}

async function editAction({
  request,
  params,
}: ActionFunctionArgs<any>): Promise<Response> {
  if (!params.contactId) {
    // Handle the case where contactId is missing or undefined
    throw new Error("Contact ID is required.");
  }

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export { rootAction, editAction };
