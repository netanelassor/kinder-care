import { Button, Drawer } from "flowbite-react";
import StudentForm from "../StudentForm/StudentForm";
import { updateStudent, fetchStudent } from "../StudentList.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../Config/query.client";
import { Gender, ParentContact, Student } from "../Student.type";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Shared/Loading";
import ErrorBlock from "../../Shared/ErrorBlock/ErrorBlock";
import { useState } from "react";


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
