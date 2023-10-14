"use client";
import { useState } from "react";

export default function NewItem({onAddItem}) {

const [name, setName] = useState("");
const [quantity, setQuantity] = useState(1);
const [category, setCategory] = useState("produce");

const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {name, quantity, category};
    
    onAddItem(newItem);

    setName("");
    setQuantity(1);
    setCategory("produce");
}

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }


return (
    <form onSubmit={handleSubmit} className="bg-gray-800 flex flex-col w-96 space-y-4 mx-auto mt-4 p-3 rounded" >
  <label className="flex flex-col">
    Name:
    <input
      className="text-black border p-2 rounded"
      type="text"
      placeholder="Item name"
      value={name}
      onChange={handleNameChange}
      required
      onInvalid={(e) => e.target.setCustomValidity("Please enter a valid item name")}
      onInput={(e) => e.target.setCustomValidity("")}
    />
  </label>
  <label className="flex flex-col">
    Quantity:
    <input
      className="text-black border p-2 rounded"
      type="number"
      min="1"
      max="99"
      value={quantity}
      onChange={handleQuantityChange}
      required
    />
  </label>
  <label className="flex flex-col">
    Category:
    <select
      className="text-black border p-2 rounded"
      value={category}
      onChange={handleCategoryChange}>
      <option value="produce">Produce</option>
      <option value="dairy">Dairy</option>
      <option value="bakery">Bakery</option>
      <option value="meat">Meat</option>
      <option value="frozen foods">Frozen Foods</option>
      <option value="canned goods">Canned Goods</option>
      <option value="dry goods">Dry Goods</option>
      <option value="beverages">Beverages</option>
      <option value="snacks">Snacks</option>
      <option value="household">Household</option>
      <option value="other">Other</option>
    </select>
  </label>
  <button
    type="submit"
    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
  >
    Add Item
  </button>
</form>
);
}