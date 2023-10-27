"use client";
import React from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import items from "./items.json";
import { useState } from "react";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context"; 
import Link from 'next/link';

export default function Page() {
  const { user } = useUserAuth();
  if (!user) {
    return (
      <div>
        <p>You must be logged in to access the shopping list.</p>
        <Link href="/">Go back to Landing Page</Link>
      </div>
    );
  }

  const itemsData = [...items];
  const [itemList, setItems] = useState(itemsData);

  function handleAddItem(newItem) {
    setItems([...itemList, newItem]);
  }

  const [selectedItemName, setSelectedItemName] = useState(null);


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
            <NewItem onAddItem={(newItem) => handleAddItem(newItem)} />
            <ItemList items={itemList} onItemSelect={(item) => handleItemSelect(item)} />
          </div>
          <div className="md:w-1/2 p-4">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </main>
      );
}
