import { Student } from "./Student.type";
import StudentCardItem from "./StudentCardView/StudentCardItem/StudentCardItem";
type Props = {
  studentList: Student[];
};
export default function StudentCardListView({
  studentList,
}: Props): JSX.Element {
  return (
    <>
      <div className="flex gap-4">
        {studentList.map((student: Student, index) => {
          return <StudentCardItem key={index} student={student} />;
        })}
      </div>
    </>
  );
}
