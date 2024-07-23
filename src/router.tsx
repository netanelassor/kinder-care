import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, StudentListPage, ChatPage, MyClassesPage, DashboardPage, NewStudentPage, StudentDetailsPage } from "./Pages/index.ts";
import App from "./App.tsx";

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <DashboardPage />,
      },
      {
        path: "/my-classes",
        element: <MyClassesPage />,
      },
      {
        path: "/students",
        element: <StudentListPage />,
        children: [
          {
            path: "/students/new",
            element: <NewStudentPage />,
          }
        ]
      },
      {
        path: "/students:id",
        element: <StudentDetailsPage />,
      },
      {
        path: "/messages",
        element: <ChatPage />,
      },
    ],
  },
]);
