import { API_URLS } from "../../Config/url.constants";

export const fetchChats = async () => {
    const response = await fetch(API_URLS.getMessages);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };