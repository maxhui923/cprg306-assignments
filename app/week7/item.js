import React from "react";

export default function Item({ item,onSelect }) {
  return (
    <ul className="bg-gray-500 w-80 p-1 m-3 hover:bg-gray-600 cursor-pointer"onClick={() => onSelect(item)}>
      <li className="text-xl font-bold" >
        {item.name}
      </li>
      <li>
        Buy {item.quantity} in {item.category}
      </li>
    </ul>
  );
}
