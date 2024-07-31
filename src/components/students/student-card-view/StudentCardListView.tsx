import { Student } from "../students.type";
import StudentCardItem from "../student-card-item/StudentCardItem";

type Props = {
  studentList: Student[];
};
export default function StudentCardListView({
  studentList,
}: Props): JSX.Element {
  return (
    <>
      <div className="flex gap-4 flex-wrap justify-between flex-1">
        {studentList.map((student: Student, index) => {
          return (<StudentCardItem key={index} student={student} />);
        })}
      </div>
    </>
  );
}
