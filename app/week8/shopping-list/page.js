"use client";
import React, { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import items from "./items.json";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context"; 
import Link from 'next/link';

export default function Page() {
  const { user } = useUserAuth();
  const [itemList, setItems] = useState([...items]);
  const [selectedItemName, setSelectedItemName] = useState(null);

  if (!user) {
    return (
      <div>
        <p>You must be logged in to access the shopping list.</p>
        <Link href="/">Go back to Landing Page</Link>
      </div>
    );
  }

  function handleAddItem(newItem) {
    setItems([...itemList, newItem]);
  }

  function handleItemSelect(item) {
    console.log("handleItemSelect called");
    console.log("Received item:", item);
    console.log("Received item name:", item.name);
   
    const cleanedName = item.name.replace(/(,.*|🍛|🥛|🍞|🥚|🍌|🥦|🍗|🍝|🧻|🍽️|🧼)/g, '').trim();
    setSelectedItemName(cleanedName);
    console.log("cleanedName:", cleanedName);
  }

  return (
    <main className="bg-gray-900 my-3 flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={itemList} onItemSelect={handleItemSelect} />
      </div>
      <div className="md:w-1/2 p-4">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
