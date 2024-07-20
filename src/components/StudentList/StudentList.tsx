import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Student } from "./Student.type";
import Loading from "../shared/Loading";
import StudentListTableView from "./StudentTableView";
import StudentCardListView from "./StudentCardListView";
import PageHeader from "../layout/PageHeader/PageHeader";

export default function StudentList(): JSX.Element {
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://user1721307475576.requestly.tech/getStudent")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: Student[]) => {
        setStudentList(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <PageHeader title="Student List" />
      {loading ? <Loading /> : null}
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
              <StudentListTableView studentList={studentList} />
            </TabPanel>
            <TabPanel>
              <StudentCardListView studentList={studentList} />
            </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
    </>
  );
}
