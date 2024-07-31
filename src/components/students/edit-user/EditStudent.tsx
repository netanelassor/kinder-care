import { Button, Drawer } from "flowbite-react";
import StudentForm from "../student-form/StudentForm";
import { updateStudent, fetchStudent } from "../students.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../utils/query.client";
import { Gender, ParentContact, Student } from "../students.type";
import { FaRegUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ErrorBlock from "../../shared/ErrorBlock/ErrorBlock";
import { useState } from "react";
import { Loading } from "../../shared";


export default function EditStudent(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleClose = () =>{ 
        setIsOpen(false);
       navigate('../');
    };


  const { id } = useParams();

  const {
    data: student,
    isPending: isPendingGetStudent,
    isError: isErrorGetStudent,
    error: errorGetStudent,
  } = useQuery({
    queryKey: ["studentList", id],
    queryFn: ({ signal }) => fetchStudent({ id, signal }),
  });

    const { mutate, isPending, isError, error } = useMutation({
      mutationFn: updateStudent,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["studentList", id] });
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
    const updatedStudent: Student = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      allergies: formData.allergies.split(',') || [],
      birthday: new Date(formData.birthday).toISOString(),
      gender: formData.gender,
      parentContact: parents,
      profileImgUrl: `https://xsgames.co/randomusers/avatar.php?g=female`,
    };

    mutate(updatedStudent);
  }

  return (
    <>

      <Drawer open={isOpen} onClose={() => handleClose()} position="bottom">
        <Drawer.Header title="Edit Student" titleIcon={FaRegUser} />
        <Drawer.Items>
          {isPendingGetStudent && (
            <div className="center">
              <Loading />
            </div>
          )}
          {isErrorGetStudent && (
            <>
              <ErrorBlock
                title={"Failed to load event details"}
                message={
                  errorGetStudent?.message || "Failed to load event details"
                }
              />
            </>
          )}
          {student && (

            <StudentForm onSubmit={handleSubmit} inputData={student}>
              <div className="flex justify-end gap-4">
                <Button type="submit" gradientDuoTone="purpleToBlue" pill>
                  Update
                </Button>
                <Button color="gray" onClick={() => handleClose()} pill>
                  Cancel
                </Button>
              </div>
            </StudentForm>
          )}
        </Drawer.Items>
      </Drawer>
    </>
  );
}
