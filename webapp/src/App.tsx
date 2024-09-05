import { useEffect, useState } from "react";
import type { ItemType } from "./utils/definitions";
import ItemForm from "./components/ItemForm";
import "./App.css";
import ItemCard from "./components/ItemCard";
import AdviceComponent from "./components/AdviceComponent";

export default function App() {
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/items`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 lg:px-24 w-full flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <AdviceComponent setItems={setItems} />
        <ItemForm setItems={setItems} />
      </div>
      <div className="flex flex-wrap gap-4">
        {items.map((item: ItemType) => (
          <ItemCard key={item["_id"]} item={item} setItems={setItems} />
        ))}
      </div>
    </div>
  );
}
