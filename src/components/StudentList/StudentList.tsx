import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Shared/Loading";
import StudentListTableView from "./StudentTableView/StudentTableView";
import StudentCardListView from "./StudentCardListView";
import PageHeader from "../Layout/PageHeader/PageHeader";
import { fetchStudents } from "./StudentList.service";

export default function StudentList(): JSX.Element {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["studentList"],
    queryFn: fetchStudents,
  });

  //   useEffect(() => {
  //     async function fetchStudents() {
  //       try {
  //         const response = await fetch(
  //           "https://user1721307475576.requestly.tech/getStudent"
  //         );
  //         const resData = await response.json();

  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }

  //         setStudentList(resData);
  //         setLoading(false);
  //       } catch (error: any) {
  //         setError({
  //           message: error.message || "error",
  //         });
  //       }
  //     }

  //     fetchStudents();
  //   }, []);

  if (isError) {
    return (
      <>
        <PageHeader title="Student List" />
        <div>Error: {error.message}</div>
      </>
    );
  }

  if (isPending) {
    return (
      <>
        <PageHeader title="Student List" />
        <Loading />
      </>
    );
  }

  return (
    <>
      <PageHeader title="Student List" />
      <TabGroup>
        <div className="flex w-full justify-center px-4">
          <TabList className="flex gap-4 p-1 rounded-full justify-ce bg-gray-800">
            <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
              Table View
            </Tab>
            <Tab className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">
              List View
            </Tab>
          </TabList>
        </div>
        <div className="flex h-screen w-full justify-center px-4">
          <TabPanels className="mt-10">
            <TabPanel>
              <StudentListTableView studentList={data} />
            </TabPanel>
            <TabPanel>
              <StudentCardListView studentList={data} />
            </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
    </>
  );
}
