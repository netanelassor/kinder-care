import StudentList from "../Components/StudentList/StudentList";
import NewStudent from "../Components/StudentList/NewStudent/NewStudent";

function StudentListPage(): JSX.Element {
  return <StudentList />;
}

function NewStudentPage(): JSX.Element {
  return <NewStudent />;
}

export {
  StudentListPage,
  NewStudentPage
}

