import { Label, TextInput, Datepicker, Select, Button, Textarea } from "flowbite-react";
import { Gender } from "../Student.type";
import { useState } from "react";
import { IoClose, IoAddCircle } from "react-icons/io5";

type Props = {
  onSubmit: any;
  children: string | JSX.Element | JSX.Element[] | boolean;
};

const StudentForm = ({ onSubmit, children }: Props) => {
  const [allergies, setAllergies] = useState<string[]>([]);
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
  };

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
          <h3 className="text-start font-bold text-white">Children Details</h3>
          <div className="flex gap-4">
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="firstName" value="First Name" />
              <TextInput id="firstName" name="firstName" type="text" required />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="lastName" value="Last Name" />
              <TextInput id="lastName" name="lastName" type="text" required />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="id" value="ID" />
              <TextInput id="id" name="id" type="text" required />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="birthday" value="Date Of Birth" />
              <Datepicker
                minDate={birthdayMinDate}
                maxDate={birthdayMaxDate}
                name="birthday"
              />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="gender" value="Gender" />
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
              <Textarea id="allergies" name="allergies" rows={2} value={allergies} className="hidden"/>

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
          <h3 className="text-start font-bold text-white">1st Parent</h3>
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
              />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="primaryParentPhone" value="Phone" />
              <TextInput
                type="tel"
                placeholder="050-1234567"
                id="primaryParentPhone"
                name="primaryParentPhone"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <h3 className="text-start font-bold text-white">2nd Parent</h3>
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
              />
            </div>
            <div className="flex flex-col text-start w-full">
              <Label htmlFor="secondaryParentPhone" value="Phone" />
              <TextInput
                type="tel"
                placeholder="050-1234567"
                id="secondaryParentPhone"
                name="secondaryParentPhone"
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
