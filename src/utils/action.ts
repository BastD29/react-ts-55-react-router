import { ActionFunctionArgs, redirect } from "react-router-dom";
import { createContact, deleteContact, updateContact } from "./contact";

async function rootAction(): Promise<Response> {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

async function editAction({
  request,
  params,
}: ActionFunctionArgs<any>): Promise<Response> {
  if (!params.contactId) {
    throw new Error("Contact ID is required.");
  }

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

async function destroyAction({
  params,
}: ActionFunctionArgs<any>): Promise<Response> {
  const contactId = params.contactId;

  if (typeof contactId !== "string") {
    throw new Error("contactId must be a string");
  }

  await deleteContact(contactId);

  return redirect("/");
}

export { rootAction, editAction, destroyAction };
