import { useEffect, useState } from "react";
import type { ItemType } from "./utils/definitions";
import ItemForm from "./components/ItemForm";
import "./App.css";
import ItemCard from "./components/ItemCard";

export default function App() {
  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data.items);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 lg:px-24 flex flex-wrap gap-4">
      <ItemForm setItems={setItems} />
      {items.map((item: ItemType) => (
        <ItemCard key={item["_id"]} item={item} setItems={setItems} />
      ))}
    </div>
  );
}
