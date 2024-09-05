import { Dispatch, SetStateAction, useState } from "react";
import { ItemType } from "../utils/definitions";

export default function ItemCard({
  item,
  setItems,
}: {
  item: ItemType;
  setItems: Dispatch<SetStateAction<ItemType[]>>;
}) {
  const [isEditing, setIstEditing] = useState<boolean>(false);

  function handleDelete() {
    fetch(`${import.meta.env.VITE_API_URL}/items/${item["_id"]}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems((prev) =>
          prev.filter((elem: ItemType) => elem["_id"] !== item["_id"])
        );
      })
      .catch((err) => console.error(err));
  }

  function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let formData = new FormData(e.target as HTMLFormElement);
    let data = {
      title: formData.get("title"),
      body: formData.get("body"),
    };
    fetch(`${import.meta.env.VITE_API_URL}/items/${item["_id"]}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems((prev) => [
          data.item,
          ...prev.filter((elem: ItemType) => elem["_id"] !== item["_id"]),
        ]);
      })
      .catch((err) => console.error(err));
    setIstEditing(false);
  }

  return (
    <>
      {isEditing ? (
        <form
          className="w-full lg:w-1/5 border flex flex-col shadow-md"
          onSubmit={handleEdit}
        >
          <input
            type="text"
            name="title"
            className="p-2 font-bold  disabled:bg-transparent disable:resize-none"
            defaultValue={item.title}
          />
          <textarea
            className="p-2 border-y grow resize-none disabled:bg-transparent"
            name="body"
            defaultValue={item.body}
          ></textarea>
          <div className="p-2 flex gap-2">
            <button className="w-fit p-2 text-white font-bold bg-green-400 hover:bg-green-700 rounded">
              Save
            </button>
            <button
              className="w-fit p-2 text-white font-bold bg-blue-400 hover:bg-blue-700 rounded"
              onClick={() => setIstEditing(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="w-full lg:w-1/5 border flex flex-col shadow-md">
          <h3 className="p-2 font-bold disabled:bg-transparent disable:resize-none">
            {item.title}
          </h3>
          <p className="p-2 border-y grow resize-none disabled:bg-transparent">
            {item.body}
          </p>
          <div className="p-2 flex gap-2">
            <button
              className="w-fit p-2 text-white font-bold bg-blue-400 hover:bg-blue-700 rounded"
              onClick={() => setIstEditing(true)}
              type="button"
            >
              Edit
            </button>
            <button
              className="w-fit p-2 text-white font-bold bg-red-400 hover:bg-red-700 rounded"
              onClick={handleDelete}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}
