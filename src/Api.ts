import { APIS } from "./Api.type";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const API_BASE_URL = "https://user1721307475576.requestly.tech";

const fetchStudents = async () => {
  const response = await fetch(`${API_BASE_URL}/${APIS.GET_STUDENT}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchChats = async () => {
  const response = await fetch(
    `${API_BASE_URL}/${APIS.GET_CONVERSATION_CENTER}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const addStudent = async (newUser: { name: string; email: string }) => {
  const response = await fetch(`${API_BASE_URL}/${APIS.POST_ADD_STUDENT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// export const useStudents = () => {
//   return useQuery(["students"], fetchStudents);
// };

// export const useChats = () => {
//   return useQuery(["chats"], fetchChats);
// };

// export const useAddUser = () => {
//   return useMutation(addStudent);
// };

// QueryClient instance
export const queryClient = new QueryClient();
