import { useEffect, useState } from "react";
import instance from "../config/axios";
import { toast } from "react-toastify";
import { ISong } from "../types/ISong";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const fetchAlbums = async () => {
    try {
      const response = await instance.get("albums/list");
      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error("Error occurred!");
    }
  };
  const removeAlbums = async (id: string) => {
    try {
      const response = await instance.post(`/albums/remove`, { id: id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred!");
    }
  };
  useEffect(() => {
    fetchAlbums();
  }, []);
  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 border p-3 border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>
        {data.map((item: ISong, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 "
          >
            <img src={item.image} className="w-12" alt="" />
            <p> {item.name} </p>
            <p> {item.desc} </p>
            <input type="color" value={item.colour} />
            <p
              className="cursor-pointer"
              onClick={() => removeAlbums(item._id)}
            >
              {" "}
              X{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
