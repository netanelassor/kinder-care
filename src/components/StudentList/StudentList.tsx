import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Shared/Loading";
import StudentListTableView from "./StudentTableView/StudentTableView";
import StudentCardListView from "./StudentCardView/StudentCardListView";
import PageHeader from "../Layout/PageHeader/PageHeader";
import { fetchStudents } from "./StudentList.service";
import { Button } from "flowbite-react";
import NewStudent from "./NewStudent/NewStudent";
import { useState } from "react";

export default function StudentList(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["studentList"],
    queryFn: fetchStudents,
  });

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
      <div className="flex flex-col gap-6">
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
          <div className="action-area flex items-center p-4">
            <Button
              gradientDuoTone="greenToBlue"
              pill
              onClick={() => setIsOpen(true)}
            >
              Add Student
            </Button>
          </div>
          <div className="flex w-full justify-center px-4">
            <TabPanels>
              <TabPanel>
                <StudentListTableView studentList={data} />
              </TabPanel>
              <TabPanel>
                <StudentCardListView studentList={data} />
              </TabPanel>
            </TabPanels>
          </div>
        </TabGroup>
      </div>

      <NewStudent isOpen={isOpen} handleClose={handleClose} />
    </>
  );
}
