import { useRouteError } from "react-router-dom";

export default function ErrorPage():JSX.Element {
  const error:any = useRouteError();

  return (
    <div id="error-page" className="flex flex-col w-screen w-full h-full justify-center">
      <h1 className="text-3xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}