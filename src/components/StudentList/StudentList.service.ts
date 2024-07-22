import { API_URLS } from "../../Config/url.constants";
import { Student } from "./Student.type";

export async function fetchStudents():Promise<Student[]> {
  const response = await fetch(API_URLS.getStudents);
  console.log("API_URLS.getStudents", API_URLS.getStudents);
  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  return await response.json();
}


export async function addStudent(newUser: { name: string; email: string }) {
  const response = await fetch(API_URLS.addStudent, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
}
