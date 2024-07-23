import { Student } from "../Student.type";
import UserAvatar from "../../Shared/Avatar";
import "./StudentCardItem.scss";
import { Tooltip, Badge, Button } from "flowbite-react";
import { CiMail } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

type Props = {
  student: Student;
};

export default function StudentCardItem({ student }: Props): JSX.Element {
  return (
    <>
      <div className="card-item flex flex-col p-6 block rounded-lg shadow-lg bg-white hover:bg-gray-00 pointer text-gray-900 font-medium gap-6">
        <UserAvatar
          firstName={student.firstName}
          lastName={student.lastName}
          imgURL={student.profileImgUrl}
        />

        <div className="text-sm flex-grow">
          <div className="text-start font-medium">Parents Details:</div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {student.parentContact.map((parent, parentIndex) => {
              return (
                <li
                  key={`${student.id}${parentIndex}`}
                  className="py-2 mt-1 text-gray-500 font-normal"
                >
                  <div className="flex justify-between">
                    <div>
                      {parent.firstName} {parent.lastName}{" "}
                      {`(${parent.prefix})`}
                    </div>
                    <div className="flex gap-3">
                      <Tooltip content={parent.email}>
                        <a href={`mailto:${parent.email}`}>
                          <CiMail className="size-5 text-green-700" />
                        </a>
                      </Tooltip>

                      <Tooltip content={parent.phone}>
                        <a href={`tel:${parent.phone}`}>
                          <BsTelephone className="size-5 text-green-700" />
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
          <div className="flex justify-between px-2 py-2 text-base outline outline-offset-2 outline-pink-500 bg-pink-500 items-center">
            <div className="text-start font-medium text-sm text-gray-100 flex items-center gap-2">
              <FaInfoCircle />
              Allergies:
            </div>
            {student.allergies?.map((item, allergyIndex) => {
              return (
                <Badge color="red" key={allergyIndex}>
                  {item}
                </Badge>
              );
            })}
          </div>
        ) : null}
        <div className="mt-auto items-center flex justify-center">
          <Button color="light" pill>
            <Link to={`/students/${student.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
