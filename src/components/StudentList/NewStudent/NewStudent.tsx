import { Button, Drawer } from "flowbite-react";
import StudentForm from "../StudentForm/StudentForm";
import { addStudent } from "../StudentList.service";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../Config/query.client";
import { Gender, ParentContact, Student } from "../Student.type";
import { FaRegUser } from "react-icons/fa";

type NewStudentProp = {
  isOpen: boolean;
  handleClose: () => void;
};

export default function NewStudent({
  isOpen,
  handleClose,
}: NewStudentProp): JSX.Element {

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentList"] });
      () => handleClose();
    },
  });

  function handleSubmit(formData: any) {

    const parents: ParentContact[] = [
      {
        firstName: formData.primaryParentFirstName,
        lastName: formData.primaryParentLastName,
        prefix: Gender.FEMALE,
        phone: formData.primaryParentPhone,
        email: formData.primaryParentEmail,
      },
      {
        firstName: formData.secondaryParentFirstName,
        lastName: formData.secondaryParentLastName,
        prefix: Gender.MALE,
        phone: formData.secondaryParentPhone,
        email: formData.secondaryParentEmail,
      },
    ];

    const newStudent: Student = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      allergies: formData.allergies.split(',') || [],
      birthday: new Date(formData.birthday).toISOString(),
      gender: formData.gender,
      parentContact: parents,
      profileImgUrl: `https://xsgames.co/randomusers/avatar.php?g=female`,
    };

    //console.log('newStudent',newStudent);
    mutate(newStudent);
  }

  return (
    <>
      <Drawer open={isOpen} onClose={() => handleClose()} position="bottom" >
        <Drawer.Header title="Add New Student" titleIcon={FaRegUser} />
        <Drawer.Items>
          <StudentForm onSubmit={handleSubmit}>
            <div className="flex justify-end gap-4">
              <Button type="submit" gradientDuoTone="purpleToBlue" pill>Create</Button>
              <Button color="gray" onClick={() => handleClose()} pill>
                Cancel
              </Button>
            </div>
          </StudentForm>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
