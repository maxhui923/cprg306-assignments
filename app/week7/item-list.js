"use client";
import React, { useState } from "react";
import Item from "./item";


export default function ItemList({items, onItemSelect }) {
  const [sortBy, setSortBy] = useState("name");
  let sortedItems = [...items]; 

  if (sortBy === "name") {
    sortedItems.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    sortedItems.sort((a, b) => a.category.localeCompare(b.category));
  } else if (sortBy === "grouped-category") {
    const groupedByCategory = items.reduce((groupedItem, item) => {
      const category = item.category;
      if (groupedItem[category] == null) groupedItem[category] = [];
      groupedItem[category].push(item);
      return groupedItem;
    }, {});

    const sortedCategoryNames = Object.keys(groupedByCategory).sort();

    sortedItems = sortedCategoryNames.flatMap((categoryName) => {
      const itemsInCategory = groupedByCategory[categoryName];
    itemsInCategory.sort((a, b) => a.name.localeCompare(b.name));
      return [
        { category: categoryName, isCategoryHeading: true },
        ...itemsInCategory,
      ];
    });
  }

  return (
    <div>
    <p className="ml-4">Sort by:</p>

    <button
      onClick={() => setSortBy("name")}
      className={`bg-${sortBy === "name" ? "blue" : "gray"}-500 text-white mx-2 px-4 py-2 rounded`}
    >
      Name
    </button>

    <button
      onClick={() => setSortBy("category")}
      className={`bg-${sortBy === "category" ? "blue" : "gray"}-500 text-white mx-2 px-4 py-2 rounded`}
    >
      Category
    </button>

    <button
      onClick={() => setSortBy("grouped-category")}
      className={`bg-${sortBy === "grouped-category" ? "blue" : "gray"}-500 text-white mx-2 px-4 py-2 rounded`}
    >
      Grouped Category
    </button>

    {sortedItems.map((item) => (
      <div key={item.id} >
        {item.isCategoryHeading ? (
          <h2 className="text-xl font-semibold mt-4 capitalize">{item.category}</h2>
        ) : (
          <Item item={item} onSelect={onItemSelect}/>
        )}
      </div>
    ))}
  </div>
  );
}




