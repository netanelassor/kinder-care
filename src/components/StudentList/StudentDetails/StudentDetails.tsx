import { useQuery } from "@tanstack/react-query";
import { fetchStudent } from "../StudentList.service";
import { Link, useParams } from "react-router-dom";
import Loading from "../../Shared/Loading";
import StudentCardItem from "../StudentCardItem/StudentCardItem";
import ErrorBlock from "../../Shared/ErrorBlock/ErrorBlock";
import { Badge } from "flowbite-react";
import { format, parseISO } from "date-fns";
import { FaBirthdayCake } from "react-icons/fa";

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
      {isError && (
        <ErrorBlock
          title="Fail to load student"
          message={error?.message || "Failed to load student"}
        />
      )}
      {data && (
        <div>
          <div className="flex gap-2">
            <Link to="/students">Go back to list</Link>
            <button className="button">edit</button>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col items-start p-6 block rounded-lg shadow-lg bg-white text-gray-900 font-medium gap-6">
              <div className="flex flex-col flex-wrap items-center justify-center gap-3">
                <div className="h-20 w-20">
                  <img
                    className="h-full w-full rounded-full object-cover object-center ring ring-white bg-blue-600"
                    src={data.profileImgUrl}
                    alt={data.firstName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-xl font-medium text-secondary-500">
                    {data.firstName} {data.lastName}
                  </div>
                  <div className="flex gap-2 items-center">
                    <FaBirthdayCake className="text-fuchsia-600" />
                    <div className="text-sm text-fuchsia-600">
                      {format(new Date(data.birthday), "MMMM do, yyyy")}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <hr></hr>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-sm">Allergies:</h3>
                  {data.allergies?.map((item, allergyIndex) => {
                    return (
                      <Badge color="red" key={allergyIndex}>
                        {item}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start p-6 block rounded-lg shadow-lg bg-white text-gray-900 font-medium gap-6 flex-grow">
              <div className="flex flex-col text-start">
                <h2>Parents Details:</h2>
                <div className="flex gap-6 text-start">
                  {data.parentContact.map((parent, parentIndex) => {
                    return (
                      <div key={`${data.id}${parentIndex}`}>
                        <h3 className="text-blue-900">
                          {parent.firstName} {parent.lastName}
                        </h3>
                        <div className="text-normal"> {parent.phone}</div>
                        <div className="text-normal"> {parent.email}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
