import React from "react";

export default function Item({ item, onSelect, onDelete }) {
  return (
    <div className="bg-gray-500 w-80 p-1 m-3 hover:bg-gray-600 cursor-pointer">
      <div className="flex justify-between items-center">
        <div onClick={() => onSelect(item)}>
          <div className="text-xl font-bold">{item.name}</div>
          <div>
            Buy {item.quantity} in {item.category}
          </div>
        </div>
        <button onClick={() => onDelete(item)} className="text-white">
          Delete
        </button>
      </div>
    </div>
  );
}
