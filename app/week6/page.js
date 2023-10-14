"use client"
import React from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import items from "./items.json";
import { useState } from "react";


export default function Page() {

    const itemsData = [...items];
    const [itemList, setItems] = useState(itemsData);

    function handleAddItem(newItem) {
        setItems([...itemList, newItem]);
    }

    return (
        <main className="bg-gray-900 my-3">
        <h1 className="p-1 text-3xl font-bold">Shopping List</h1>
        <NewItem onAddItem = {(newItem)=>handleAddItem(newItem)}/>
        <ItemList items={itemList}/>
        </main>
    );
    }