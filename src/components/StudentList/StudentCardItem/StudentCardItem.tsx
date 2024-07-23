import { Student } from "../Student.type";
import UserAvatar from "../../Shared/Avatar";
import "./StudentCardItem.scss";
import { Tooltip, Badge, Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { GrPhone, GrMailOption } from "react-icons/gr";

type Props = {
  student: Student;
};

export default function StudentCardItem({ student }: Props): JSX.Element {
  return (
    <Card className="card-item max-w-sm block shadow-lg pointer flex flex-col font-medium gap-6">
      <UserAvatar
        firstName={student.firstName}
        lastName={student.lastName}
        imgURL={student.profileImgUrl}
      />

      <div className="text-sm flex-1">
        <div className="text-start font-medium">Parents Details:</div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {student.parentContact.map((parent, parentIndex) => {
            return (
              <li
                key={`${student.id}${parentIndex}`}
                className="py-2 mt-1 font-normal"
              >
                <div className="flex justify-between">
                  <div>
                    {parent.firstName} {parent.lastName} {`(${parent.prefix})`}
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
              </li>
            );
          })}
        </ul>
      </div>
      {student.allergies?.length ? (
        <div className="flex justify-between p-4 text-base bg-gray-700 items-center">
          <div className="text-start font-medium text-sm text-gray-100 flex items-center gap-2">
            <FaInfoCircle />
            Allergies:
          </div>
          {student.allergies?.map((item, allergyIndex) => {
            return (
              <div
                key={allergyIndex}
                className="flex gap-2 items-center justify-center px-2 py-1 rounded-full text-xs bg-red-500  text-center"
              >
                {item}
              </div>
            );
          })}
        </div>
      ) : null}
      <div className="mt-auto items-center flex flex-col">
        <Button color="light" pill>
          <Link to={`/students/${student.id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
}
