export type ParentContact = {
  firstName: string;
  lastName: string;
  prefix:string;
  phone: string;
  email: string;
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthday: string; // ISO 8601 format
  parentContact: ParentContact[];
  allergies: string[];
  specialNotes: string;
};

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}
