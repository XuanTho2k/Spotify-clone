import { useNavigate } from "react-router-dom";

const AlbumItem = ({
  image,
  name,
  desc,
  id,
}: {
  image: string;
  name: string;
  desc: string;
  id: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] "
      onClick={() => navigate(`/album/${id}`)}
    >
      <img src={image} className="rounded md:w-[255pw] md:h-[255px]" alt="" />
      <p className="font-bold mt-2 mb-1"> {name} </p>
      <p className="text-slate-200 text-sm"> {desc} </p>
    </div>
  );
};

export default AlbumItem;
