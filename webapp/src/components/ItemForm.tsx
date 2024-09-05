import { Dispatch, SetStateAction, useState } from "react";
import { ItemType } from "../utils/definitions";

export default function ItemForm({
  setItems,
}: {
  setItems: Dispatch<SetStateAction<ItemType[]>>;
}) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let formData = new FormData(e.target as HTMLFormElement);
    let data = {
      title: formData.get("title"),
      body: formData.get("body"),
    };
    fetch(`${import.meta.env.VITE_API_URL}/items`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems((prev) => [data.item, ...prev]);
      })
      .catch((err) => console.error(err));
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="w-full m-auto border shadow-md">
      <div
        className="p-4 hover:bg-gray-100 font-bold flex justify-between border-b"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <p>Create Own</p>
        <span>{isCollapsed ? "+" : "-"}</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`p-4 flex flex-col gap-2 ${
          isCollapsed ? "hidden" : "block"
        } lg:flex`}
      >
        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="title">Title:</label>
          <input className="p-2 border" type="text" name="title" required />
        </div>
        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="body">Content:</label>
          <textarea
            className="p-2 border h-32 resize-none"
            name="body"
            id="body"
          ></textarea>
        </div>
        <button
          className="p-2 bg-blue-300 font-bold text-white hover:bg-blue-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
