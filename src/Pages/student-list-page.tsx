import EditStudent from "../Components/StudentList/EditStudent/EditStudent";
import StudentList from "../Components/StudentList/StudentList";
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
