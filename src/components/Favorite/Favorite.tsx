import { ContactProps } from "../../routes/contact";
import { Form } from "react-router-dom";

interface FavoriteProps {
  contact: ContactProps;
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
