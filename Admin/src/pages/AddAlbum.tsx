import { FormEvent, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import instance from "../config/axios";

const AddAlbum = () => {
  const [image, setImage] = useState<File | null>(null);
  const [colour, setColour] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      if (image !== null) formData.append("imageFile", image);
      formData.append("bgColour", colour);

      const response = await instance.post(`/albums/add`, formData);

      if (response.data.success) {
        toast.success("Album added!");
        setDesc("");
        setImage(null);
        setName("");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setLoading(false);
  };
  if (loading)
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 place-self-center border-4 border-r-gray-400 border-t-green-800 rounded-full animate-spin"></div>
      </div>
    );
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setImage(e.target.files[0]);
            }
          }}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            className="w-24 cursor-pointer"
            alt=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[max(40vw,250px)]"
          name=""
          placeholder="Type here"
          id=""
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2 w-[max(40vw,250px)]"
          name=""
          placeholder="Type here"
          id=""
        />
      </div>
      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          onChange={(e) => setColour(e.target.value)}
          type="color"
          value={colour}
        />
      </div>
      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
