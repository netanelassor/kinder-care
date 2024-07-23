import { useQuery } from "@tanstack/react-query";
import { fetchStudent } from "../StudentList.service";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Shared/Loading";
import StudentCardItem from "../StudentCardItem/StudentCardItem";
import ErrorBlock from "../../Shared/ErrorBlock/ErrorBlock";

export default function StudentDetails(): JSX.Element {
  const { id } = useParams();
  console.log(id);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["studentList", id],
    queryFn: ({ signal }) => fetchStudent({ id, signal }),
  });

  return (
    <>
      {isPending && <Loading />}
      {isError && <ErrorBlock title="Fail to load student" message={error?.message || "Failed to load student"}/>}
      {data && (
        <div>
          <div className="flex">
            <Link to="../">Go back to list</Link>
            <button className="button">edit</button>
          </div>
          <StudentCardItem student={data} />
        </div>
      )}
    </>
  );
}
