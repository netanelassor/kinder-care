import EditStudent from "../components/students/edit-user/EditStudent";
import StudentList from "../components/students/StudentList";
import { Outlet } from "react-router-dom";

function StudentListOutlet(): JSX.Element {
  return (
    <>
      <Outlet />
    </>
  );
}

function StudentListPage(): JSX.Element {
  return <StudentList />;
}

function EditStudentPage(): JSX.Element {
  return <EditStudent/>;
}


export { StudentListPage, StudentListOutlet, EditStudentPage };
