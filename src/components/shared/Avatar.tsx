type AvatarProps = {
    imgURL:string;
    firstName:string;
    lastName:string;
};

export default function AvatarView({firstName,lastName, imgURL}:AvatarProps): JSX.Element {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="h-10 w-10">
        <img
          className="h-full w-full rounded-full object-cover object-center ring ring-white"
          src={imgURL}
          alt=""
        />
      </div>
      <div>
        <div className="text-sm font-medium text-secondary-500">
         { firstName} {lastName}
        </div>
      </div>
    </div>
  );
}

