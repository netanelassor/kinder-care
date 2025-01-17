import { API_URLS } from "../../constants/endpoints.constants";
import { Student } from "./students.type";

export async function fetchStudents(): Promise<Student[]> {
  const response = await fetch(API_URLS.getStudents);
  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { students } = await response.json();

  return students;
}

export async function fetchStudent({ id, signal }: any): Promise<Student> {
  const response = await fetch(`${API_URLS.getStudents}/${id}`, { signal });

  if (!response.ok) {
    const error: any = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { student } = await response.json();

  return student;
}

export async function addStudent(newUser: Student) {
  const response = await fetch(`${API_URLS.addStudent}`, {
    method: "POST",
    body: JSON.stringify({ student: newUser }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error: any = new Error("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { student } = await response.json();
  return student;
}


export async function updateStudent({ id, student }: any) {
  const response = await fetch(`${API_URLS.addStudent}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ student }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error: any = new Error("An error occurred while updating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}