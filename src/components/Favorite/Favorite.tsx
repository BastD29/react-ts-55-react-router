import { Form } from "react-router-dom";
import { ContactType } from "../../models/Contact";

interface FavoriteProps {
  contact: ContactType;
}

export function Favorite({ contact }: FavoriteProps) {
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
