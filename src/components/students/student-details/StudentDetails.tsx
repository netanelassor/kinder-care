import { useQuery } from "@tanstack/react-query";
import { fetchStudent } from "../students.service";
import { Link, Outlet, useParams } from "react-router-dom";
import Loading from "../../shared/Loading";
import ErrorBlock from "../../shared/ErrorBlock/ErrorBlock";
import { Button } from "flowbite-react";
import { format, parseISO } from "date-fns";
import { FaBirthdayCake } from "react-icons/fa";
import PageHeader from "../../layout/page-header/PageHeader";
import { HiOutlineArrowLeft, HiPencil } from "react-icons/hi";

export default function StudentDetails(): JSX.Element {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["studentList", id],
    queryFn: ({ signal }) => fetchStudent({ id, signal }),
  });

  return (
    <>
    <Outlet />
      <PageHeader
        title={`Student Details ${
          data ? "- " + data.firstName + " " + data.lastName : " "
        }`}
      />
      <div className="flex flex-col gap-6 px-2">
        {isPending && <Loading />}
        {isError && (
          <ErrorBlock
            title="Fail to load student"
            message={error?.message || "Failed to load student"}
          />
        )}
        {data && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <Button gradientDuoTone="purpleToBlue" pill>
                <Link to="edit">
                  <div className="flex gap-2">
                    <HiPencil className="h-5 w-5" />
                    Edit
                  </div>
                </Link>
              </Button>
              <Button gradientDuoTone="purpleToBlue" outline pill>
                <div className="flex gap-2">
                  <HiOutlineArrowLeft className="h-5 w-5" />
                  <Link to="../">Go back to list</Link>
                </div>
              </Button>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-start p-6 block rounded-lg shadow-lg bg-white text-gray-900 font-medium gap-6">
                <div className="flex flex-col flex-wrap items-center justify-center gap-3">
                  <div className="h-20 w-20">
                    <img
                      className="h-full w-full rounded-full object-cover object-center ring ring-white bg-indigo-600"
                      src={data.profileImgUrl}
                      alt={data.firstName}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-xl font-bold font-medium text-secondary-500">
                      {data.firstName} {data.lastName}
                    </div>
                    <div className="flex gap-2 items-center px-2 py-1 rounded-full text-xs bg-indigo-600 text-white">
                      <FaBirthdayCake className="text-sm" />
                      <div>
                        {format(parseISO(data.birthday), "MMMM do, yyyy")}
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
                        <div
                          key={allergyIndex}
                          className="flex gap-2 items-center justify-center px-2 py-1 rounded-full text-xs bg-red-500 text-white text-center"
                        >
                          {item}
                        </div>
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
      </div>
    </>
  );
}
