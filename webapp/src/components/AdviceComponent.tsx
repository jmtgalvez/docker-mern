import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ItemType } from "../utils/definitions";

export default function AdviceComponent({
  setItems,
}: {
  setItems: Dispatch<SetStateAction<ItemType[]>>;
}) {
  const [advice, setAdvice] = useState<any>(null);

  async function getNewAdvice() {
    const result = await fetch(`https://api.adviceslip.com/advice`);
    const data = await result.json();
    setAdvice(data);
  }

  async function handleSave() {
    let { value: title } = await Swal.fire({
      title: "Give it a title",
      input: "text",
      showCancelButton: true,
    });

    if (!title) return;

    let data = {
      title: title,
      body: advice?.slip.advice,
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
  }

  useEffect(() => {
    getNewAdvice();
  }, []);

  return (
    <div className="lg:col-span-3 p-8 flex flex-col gap-4 items-center justify-center shadow-md">
      <p className="max-w-96 font-bold text-2xl text-center">
        {advice?.slip.advice}
      </p>
      <div className="w-fit grid grid-cols-2 gap-2">
        <button
          className="p-2 font-bold shadow hover:bg-gray-100"
          onClick={getNewAdvice}
        >
          Generate New
        </button>
        <button
          className="p-2 font-bold shadow hover:bg-gray-100"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
