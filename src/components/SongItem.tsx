import React from "react";

const SongItem = ({
  name,
  image,
  desc,
  id,
}: {
  name: string;
  image: string;
  desc: string;
  id: number;
}) => {
  return (
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] ">
      <img src={image} alt="" className="rounded" />
      <p className="font-bold mt-2 mb-1"> {name}</p>
      <p className="text-slate-200 text-sm"> {desc} </p>
    </div>
  );
};

export default SongItem;
