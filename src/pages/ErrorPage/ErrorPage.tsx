import { useRouteError } from "react-router-dom";

// Define an interface for your error object if it's not already defined
interface ErrorObject {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  // Use as ErrorObject to ensure TypeScript understands the structure of error
  const error = useRouteError() as unknown as ErrorObject;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
