import {
  Label,
  TextInput,
  Datepicker,
  Select,
  Textarea,
} from "flowbite-react";
import { Gender, Student } from "../students.type";
import { useState } from "react";
import { IoClose, IoAddCircle } from "react-icons/io5";
import { STUDENTS } from "../../../constants/locals/en-US.constants";

type Props = {
  onSubmit: any;
  children: string | JSX.Element | JSX.Element[] | boolean;
  inputData?: Student | undefined;
};

const StudentForm = ({ inputData, onSubmit, children }: Props) => {
  const [allergies, setAllergies] = useState<string[]>(inputData?.allergies ?? []);
  const [newAllergy, setNewAllergy] = useState<string>("");

  const currentDate = new Date();
  const birthdayMaxDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 3,
    currentDate.getDate()
  );
  const birthdayMinDate = new Date(
    currentDate.getFullYear() - 6,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  function handleSubmit(event: any) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data });
  }

  function handleAddAllergy() {
    if (newAllergy.trim() !== "") {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  }

  const handleRemoveAllergy = (index: number) => {
    const newAllergies = allergies.filter((_, i) => i !== index);
    setAllergies(newAllergies);
  };

  return (
    <form
      className="flex flex-col gap-4 p-4"
      id="student-form"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-20 h-80  w-full">
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-start font-bold text-white">{STUDENTS.FORM_PAGE.STUDENT_DETAILS_SECTION}</h3>
          <div className="flex gap-4">
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="firstName" value={STUDENTS.FORM_PAGE.FIRST_NAME_LBL} />
              <TextInput
                id="firstName"
                name="firstName"
                type="text"
                required
                defaultValue={inputData?.firstName ?? ""}
              />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="lastName" value={STUDENTS.FORM_PAGE.LAST_NAME_LBL} />
              <TextInput
                id="lastName"
                name="lastName"
                type="text"
                required
                defaultValue={inputData?.lastName ?? ""}
              />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="id" value={STUDENTS.FORM_PAGE.ID_NAME_LBL} />
              <TextInput
                id="id"
                name="id"
                type="text"
                required
                defaultValue={inputData?.id ?? ""}
                disabled={inputData && inputData.id ? true : false}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="birthday" value={STUDENTS.FORM_PAGE.DOB_NAME_LBL} />
              <Datepicker
                minDate={birthdayMinDate}
                maxDate={birthdayMaxDate}
                name="birthday"
              />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="gender" value={STUDENTS.FORM_PAGE.GENDER_NAME_LBL} />
              <Select id="gender" name="gender" required>
                {Object.entries(Gender).map(([objKey, value]) => {
                  return (
                    <option key={objKey} value={value}>
                      {value}
                    </option>
                  );
                })}
              </Select>
            </div>
          </div>

          <div className="flex bg-gray-700 p-4 rounded">
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="allergies" value="Allergies" />
              <Textarea
                id="allergies"
                name="allergies"
                rows={2}
                value={allergies}
                className="hidden"
                readOnly
              />

              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <TextInput
                    id="allergiesChip"
                    name="allergiesChip"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder="Add a new allergy"
                    type="text"
                  />

                  <button
                    type="button"
                    onClick={handleAddAllergy}
                    className="text-green-400 text-4xl hover:text-green-500"
                  >
                    <IoAddCircle />
                  </button>
                </div>
                <div className="flex gap-2">
                  {allergies.map((allergy, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-center justify-between px-2 py-1 rounded-full text-xs bg-red-500 text-white text-center"
                    >
                      {allergy}
                      <button
                        type="button"
                        onClick={() => handleRemoveAllergy(index)}
                        className="bg-red-900 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-800 "
                      >
                        <IoClose />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-start font-bold text-white">{STUDENTS.FORM_PAGE.FIRST_PARENTS_DETAILS_SECTION}</h3>
          <div className="flex gap-4">
            <div className="flex flex-col text-start w-full">
              <Label
                htmlFor="primaryParentFirstName"
                value="1st Parent - First Name"
              />
              <TextInput
                id="primaryParentFirstName"
                name="primaryParentFirstName"
                type="text"
                required
                defaultValue={
                  inputData && inputData?.parentContact.length > 0
                    ? inputData.parentContact[0].firstName
                    : ""
                }
              />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label
                htmlFor="primaryParentLastName"
                value="1st Parent - Last Name"
              />
              <TextInput
                id="primaryParentLastName"
                name="primaryParentLastName"
                type="text"
                required
                defaultValue={
                  inputData && inputData?.parentContact.length > 0
                    ? inputData.parentContact[0].lastName
                    : ""
                }
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="primaryParentEmail" value="Email" />
              <TextInput
                type="email"
                placeholder="name@example.com"
                id="primaryParentEmail"
                name="primaryParentEmail"
                required
                defaultValue={
                  inputData && inputData?.parentContact.length > 0
                    ? inputData.parentContact[0].email
                    : ""
                }
              />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="primaryParentPhone" value="Phone" />
              <TextInput
                type="tel"
                placeholder="050-1234567"
                id="primaryParentPhone"
                name="primaryParentPhone"
                defaultValue={
                  inputData && inputData?.parentContact.length > 0
                    ? inputData.parentContact[0].phone
                    : ""
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-start font-bold text-white">{STUDENTS.FORM_PAGE.SECOND_PARENTS_DETAILS_SECTION}</h3>
          <div className="flex gap-4">
            <div className="flex flex-col text-start w-full">
              <Label
                htmlFor="secondaryParentFirstName"
                value="2nd Parent - First Name"
              />
              <TextInput
                id="secondaryParentFirstName"
                name="secondaryParentFirstName"
                type="text"
                required
                defaultValue={
                  inputData && inputData?.parentContact.length > 1
                    ? inputData.parentContact[1]?.firstName
                    : ""
                }
              />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label
                htmlFor="primaryParentLastName"
                value="2nd Parent - Last Name"
              />
              <TextInput
                id="secondaryParentLastName"
                name="secondaryParentLastName"
                type="text"
                required
                defaultValue={
                  inputData && inputData?.parentContact.length > 1
                    ? inputData.parentContact[1]?.lastName
                    : ""
                }
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="secondaryParentEmail" value="Email" />
              <TextInput
                type="email"
                placeholder="name@example.com"
                id="secondaryParentEmail"
                name="secondaryParentEmail"
                required
                defaultValue={
                  inputData && inputData?.parentContact.length > 1
                    ? inputData.parentContact[1]?.email
                    : ""
                }
              />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="secondaryParentPhone" value="Phone" />
              <TextInput
                type="tel"
                placeholder="050-1234567"
                id="secondaryParentPhone"
                name="secondaryParentPhone"
                defaultValue={
                  inputData && inputData?.parentContact.length > 1
                    ? inputData.parentContact[1]?.phone
                    : ""
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </form>
  );
};

export default StudentForm;
