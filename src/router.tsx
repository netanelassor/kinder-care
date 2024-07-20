import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, StudentListPage, ChatPage, MyClassesPage, DashboardPage } from "./routes/index.ts";
import App from "./App.tsx";

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "my-classes",
        element: <MyClassesPage />,
      },
      {
        path: "student-list",
        element: <StudentListPage />,
      },
      {
        path: "messages",
        element: <ChatPage />,
      },
    ],
  },
]);
