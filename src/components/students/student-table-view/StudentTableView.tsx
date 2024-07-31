import { Gender, Student } from "../students.type";
import { Tooltip, Badge, Table } from "flowbite-react";
import { GrUser, GrUserFemale, GrPhone, GrMailOption } from "react-icons/gr";
import UserAvatar from "../../shared/Avatar";
import { useNavigate } from "react-router-dom";

type Props = {
  studentList: Student[];
};

export default function StudentListTableView({
  studentList,
}: Props): JSX.Element {
  const navigate = useNavigate();

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
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 pointer"
                  onClick={() => navigate(`/students/${student.id}`)}
                >
                  <Table.Cell>{student.id}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center gap-4 text-start">
                      <UserAvatar
                        firstName={student.firstName}
                        lastName={student.lastName}
                        imgURL={student.profileImgUrl}
                      />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {student.allergies?.map((item, allergyItem) => {
                      return (
                        <div key={allergyItem} className="flex gap-2 items-center justify-center px-2 py-1 rounded-full text-xs bg-red-500 text-white text-center">
                        {item}
                      </div>
                      );
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center justify-center">
                      {student.gender === Gender.MALE ? (
                        <GrUser className="text-xl text-blue-600" />
                      ) : (
                        <GrUserFemale className="text-xl text-pink-600" />
                      )}
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
    </>
  );
}
