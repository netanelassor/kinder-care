import { Gender, Student } from "../Student.type";
import { Tooltip, Badge, Table } from "flowbite-react";
import { GrUser, GrUserFemale, GrPhone, GrMailOption} from "react-icons/gr";

type Props = {
  studentList: Student[];
};

export default function StudentListTableView({
  studentList,
}: Props): JSX.Element {
  const columnList: string[] = ["ID", "Name", "Allergies", "Gender", "Parents"];

  return (
    <>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            {columnList.map((column, colIndex) => {
              return <Table.HeadCell key={colIndex}>{column}</Table.HeadCell>;
            })}
          </Table.Head>
          <Table.Body className="divide-y">
            {studentList.map((student, studentIndex) => {
              return (
                <Table.Row
                  key={studentIndex}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{student.id}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {student.firstName} {student.lastName}
                  </Table.Cell>
                  <Table.Cell>
                    {student.allergies?.map((item, allergyItem) => {
                      return (
                        <div key={allergyItem}>
                          <Badge color="pink">{item}</Badge>
                        </div>
                      );
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center justify-center">                    
                      {student.gender === Gender.MALE ? <GrUser className="text-xl text-blue-600"/> : <GrUserFemale className="text-xl text-pink-600"/>}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-col gap-2">
                    {student.parentContact.map((parent, parentIndex) => {
                      return (
                        <div
                          key={parentIndex}
                          className="flex gap-6 justify-between"
                        >
                          <div>
                            {parent.firstName} {parent.lastName}{" "}
                            {`(${parent.prefix})`}
                          </div>
                          <div className="flex gap-3">
                            <Tooltip content={parent.email}>
                              <a href={`mailto:${parent.email}`}>
                                <GrMailOption className="size-5 text-violet-500" />
                              </a>
                            </Tooltip>

                            <Tooltip content={parent.phone}>
                              <a href={`tel:${parent.phone}`}>
                                <GrPhone className="size-5 text-violet-500" />
                              </a>
                            </Tooltip>
                          </div>
                        </div>
                      );
                    })}
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>

      {/* <div className="flex w-full justify-center px-4">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Id</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Gender</th>
                    <th className="px-6 py-3">Parents</th>
                  </tr>
                </thead>
                <tbody>
                  {studentList.map((student: Student, index) => {
                    return (
                      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {student.id}
                        </th>
                        <td className="px-6 py-4">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="px-6 py-4">
                          {student.gender === Gender.MALE ? "Boy" : "Girl"}
                        </td>
                        <td className="px-6 py-4">
                     
                          {student.parentContact.map((parent, parentIndex) => {
                            return (
                              <div key={parentIndex}>
                                {parent.firstName} {parent.lastName}
                              </div>
                            );
                          })}
                        </td>
                      </tr>
                    );
                  })} 
                </tbody>
              </table>
            </div>
          </div> */}
    </>
  );
}
