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

export { StudentListPage, StudentListOutlet };
