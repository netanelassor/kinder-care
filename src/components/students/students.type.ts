export type ParentContact = {
  firstName: string;
  lastName: string;
  prefix?: Gender;
  phone: string;
  email: string;
};

export type Student = {
  intId?: string;
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthday: string; // ISO 8601 format
  parentContact: ParentContact[];
  allergies?: string[];
  specialNotes?: string;
  profileImgUrl: string;
};

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}
