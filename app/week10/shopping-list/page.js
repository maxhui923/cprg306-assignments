"use client";
import React, { useState, useEffect } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import { getItems, addItem, deleteItem} from "../_services/shopping-list-service";

export default function Page() {
  const { user } = useUserAuth();
  const [itemList, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState(null);

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);
  
  async function loadItems() {
    try {
      const items = await getItems(user.uid);
      console.log("Retrieved items:", items);
      setItems(items);

      
    } catch (error) {
      console.error("Error loading items:", error);
    }
  }


  if (!user) {
    return (
      <div>
        <p>You must be logged in to access the shopping list.</p>
        <Link href="/">Go back to Landing Page</Link>
      </div>
    );
  }

  
  async function handleAddItem(newItem) {
    try {
      // Call addItem function to add the item to the shopping list
      const newItemId = await addItem(user.uid, newItem);

      // Set the id of the new item
      newItem.id = newItemId;

      // Update the state of items to include the new item
      setItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle the error as needed
    }
  }

  async function handleDeleteItem(item) {
    try {
      // Call deleteItem function to delete the item from the shopping list
      await deleteItem(user.uid, item.id);

      // Update the state of items to exclude the deleted item
      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle the error as needed
    }
  }

  function handleItemSelect(item) {
    console.log("handleItemSelect called");
    console.log("Received item:", item);
    console.log("Received item name:", item.data.name);

    const cleanedName = item.data.name

    setSelectedItemName(cleanedName);
    console.log("cleanedName:", cleanedName);
  }

  


  return (
    <main className="bg-gray-900 my-3 flex flex-col md:flex-row">
      <div className="md:w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={itemList} onItemSelect={handleItemSelect} onItemDelete={handleDeleteItem}/>
      </div>
      <div className="md:w-1/2 p-4">
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
