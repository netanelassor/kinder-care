import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import StudentForm from "../StudentForm/StudentForm";
import { addStudent } from "../StudentList.service";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../Config/query.client";
import { Gender, ParentContact, Student } from "../Student.type";

export default function NewStudent(): JSX.Element {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentList"] });
      navigate("/students");
    },
  });

  function handleSubmit(formData: any) {
    console.log("handleSubmit formData", formData);

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
      intId: "xx",
      id: "xx",
      firstName: formData.firstName,
      lastName: formData.lastName,
      allergies: formData.allergies || [],
      birthday: "32050504",
      gender: Gender.FEMALE,
      parentContact: parents,
      profileImgUrl: `https://xsgames.co/randomusers/avatar.php?g=female`
    };
    console.log("newStudent", newStudent);

    mutate(newStudent);
  }

  return (
    <>
      <Modal show={true} size="3xl" onClose={() => navigate("../")} popup>
        <Modal.Header className="text-gray-900">Add New Student</Modal.Header>
        <Modal.Body className="text-gray-900">
          <StudentForm onSubmit={handleSubmit}>
            <div className="flex justify-end gap-4">
              <Button type="submit">Create</Button>
              <Button color="gray" onClick={() => navigate("../")}>
                Cancel
              </Button>
            </div>
          </StudentForm>
        </Modal.Body>
      </Modal>
    </>
  );
}
