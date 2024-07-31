import { createBrowserRouter } from "react-router-dom";
import {
  ErrorPage,
  StudentListPage,
  ChatPage,
  MyClassesPage,
  DashboardPage,
  StudentListOutlet,
  StudentDetailsPage,
  EditStudentPage
} from "./pages/index.ts";
import App from "./App.tsx";
import ChatContent from "./components/chat/ChatContent/ChatContent.tsx";

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
        path: "/chat",
        element: <ChatPage />,
        children: [
          {
            path: "/chat/:id",
            element: <ChatContent />,
          },
        ]
      },
      {
        path: "/my-classes",
        element: <MyClassesPage />,
      },
      {
        path: "/students",
        element: <StudentListOutlet />,
        children: [
          {
            path: "/students",
            element: <StudentListPage />,
          },
          {
            path: "/students/:id",
            element: <StudentDetailsPage />,
            children: [
              {
                path: "/students/:id/edit",
                element: <EditStudentPage />
              }
            ],
          },
        ]
      }
    ],
  },
]);
