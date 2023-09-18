import React from "react";
import ItemList from "./item-list";

export default function Page() {
    return (
        <main className="bg-gray-900 my-3">
        <h1 className="p-1 text-3xl font-bold">Shopping List</h1>
        <ItemList/>
        </main>
    );
    }