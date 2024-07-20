import { Student } from "./Student.type";
import AvatarView from "../shared/Avatar";
import "./StudentCardItem.scss";
import { Tooltip, Badge } from "flowbite-react";
import { CiMail } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";

type Props = {
  student: Student;
};

export default function StudentCardItem({ student }: Props): JSX.Element {
  return (
    <>
      <div className="card-item p-6 block rounded-lg shadow-lg bg-white hover:bg-gray-00 pointer text-gray-900 font-medium">
        <AvatarView
          firstName={student.firstName}
          lastName={student.lastName}
          imgURL="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />

        <div className="mt-6 text-sm">
          <div className="text-start font-medium">Parents Details:</div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {student.parentContact.map((parent, parentIndex) => {
              return (
                <>
                  <li
                    key={parentIndex}
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
                </>
              );
            })}
          </ul>
        </div>
        <div className="flex justify-between rounded px-2 py-2 mt-6 text-base outline outline-offset-2 outline-pink-500 items-center">
          <div className="text-start font-medium text-sm">Allergies:</div>
          {student.allergies.map((item, allergyIndex) => {
            return (
              <Badge color="red" key={allergyIndex}>
                {item}
              </Badge>
            );
          })}
        </div>
      </div>
    </>
  );
}
