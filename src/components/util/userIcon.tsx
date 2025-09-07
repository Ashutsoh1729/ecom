"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserIcon = ({ img, name }: { img: string; name: string }) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src={img} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserIcon;
