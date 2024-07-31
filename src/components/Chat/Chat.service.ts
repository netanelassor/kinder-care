import { API_URLS } from "../../constants/endpoints.constants";

export async function fetchChats() {
  const response = await fetch(API_URLS.getMessages);
  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { chat } = await response.json();
  return chat;
}


export async function fetchChatsDetails(id:any) {
  
  const response = await fetch(`${API_URLS.getMessages}/${id}`);
  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { chat } = await response.json();
  return chat;
}